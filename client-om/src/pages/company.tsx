import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import gql from "graphql-tag";
import withApollo from "../lib/withApollo";
import styles from "../styles/company.module.css";

const CREATE_COMPANY_MUTATION = gql`
  mutation CreateCompany(
    $name: String!
    $fiscalId: String!
    $clientNumber: Float!
    $receipts: [CreateReceiptInput!]
  ) {
    createCompany(
      name: $name
      fiscalId: $fiscalId
      clientNumber: $clientNumber
      receipts: $receipts
    ) {
      id
      name
      fiscalId
      clientNumber
      receipts {
        id
        date
        taxAmount
        taxPercentage
      }
    }
  }
`;

type ReceiptField = "taxAmount" | "taxPercentage" | "date";

const CompanyPage: React.FC = () => {
  const [name, setName] = useState("");
  const [fiscalId, setFiscalId] = useState("");
  const [clientNumber, setClientNumber] = useState("");
  const [receipts, setReceipts] = useState([
    { taxAmount: 0, taxPercentage: 0, date: "" },
  ]);
  const [createCompany, { error, data }] = useMutation(CREATE_COMPANY_MUTATION);

  const addReceiptField = () => {
    setReceipts([...receipts, { taxAmount: 0, taxPercentage: 0, date: "" }]);
  };
  const resetFields = () => {
    setName('');
    setFiscalId('');
    setClientNumber('');
    setReceipts([{ taxAmount: 0, taxPercentage: 0, date: '' }]);
  };


  const handleReceiptChange = (
    index: number,
    field: ReceiptField,
    value: string
  ) => {
    const updatedReceipts = [...receipts];
    if (field === "taxAmount" || field === "taxPercentage") {
      updatedReceipts[index][field] = parseFloat(value);
    } else {
      updatedReceipts[index][field] = value;
    }
    setReceipts(updatedReceipts);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await createCompany({
        variables: {
          name,
          fiscalId,
          clientNumber: parseFloat(clientNumber),
          receipts,
        },
      });
      resetFields()
      alert("Company created successfully");
    } catch (error) {
        
      resetFields()
      console.error("Error during company creation:", error);
    }
  };

  return (
    <div className={styles.container}>
      <h1>Create Company Report</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <br />
        <input
          type="text"
          placeholder="Fiscal ID"
          value={fiscalId}
          onChange={(e) => setFiscalId(e.target.value)}
        />
        <br />
        <input
          type="number"
          placeholder="Client Number"
          value={clientNumber}
          onChange={(e) => setClientNumber(e.target.value)}
        />
        <br />
        <h4>Receipts:</h4>
        {receipts.map((receipt, index) => (
          <div key={index} className={styles.receipt}>
            <label htmlFor={`taxAmount-${index}`}>Tax Amount</label>
            <input
              type="number"
              id={`taxAmount-${index}`}
              placeholder="Tax Amount"
              value={receipt.taxAmount}
              onChange={(e) =>
                handleReceiptChange(index, "taxAmount", e.target.value)
              }
            />
            <label htmlFor={`taxPercentage-${index}`}>Tax Percentage</label>
            <input
              type="number"
              id={`taxPercentage-${index}`}
              placeholder="Tax Percentage"
              value={receipt.taxPercentage}
              onChange={(e) =>
                handleReceiptChange(index, "taxPercentage", e.target.value)
              }
            />
            <label htmlFor={`date-${index}`}>Date</label>
            <input
              type="date"
              id={`date-${index}`}
              placeholder="Date"
              value={receipt.date}
              onChange={(e) =>
                handleReceiptChange(index, "date", e.target.value)
              }
            />
          </div>
        ))}
        <button type="button" onClick={addReceiptField}>
          Add Receipt
        </button>
        <br />
        <button type="submit">Create Company</button>
      </form>
      {error && <p>Error: {error.message}</p>}
    </div>
  );
};

export default withApollo(CompanyPage);
