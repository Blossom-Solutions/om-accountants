import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import styles from '../styles/reports.module.css';
import withApollo from '../lib/withApollo';


const COMPANIES_QUERY = gql`
  query Companies {
    companies {
      id
      name
      fiscalId
      clientNumber
      approvals {
        id
        approved
      }
      receipts {
        id
        date
        taxAmount
        taxPercentage
      }
    }
  }
`;

const SET_APPROVAL_STATUS_MUTATION = gql`
  mutation SetApprovalStatus($approvalId: Int!, $status: Boolean!) {
    setApprovalStatus(approvalId: $approvalId, status: $status) {
      id
      approved
    }
  }
`;

const ReportsPage: React.FC = () => {
    const { loading, error, data } = useQuery(COMPANIES_QUERY);
    console.log(data)
    const [setApprovalStatus] = useMutation(SET_APPROVAL_STATUS_MUTATION);
  
    const handleApprove = async (approvalId: number) => {
      try {
        await setApprovalStatus({
          variables: {
            approvalId,
            status: true,
          },
        });
        alert('Approval status updated successfully');
      } catch (error) {
        console.error('Error updating approval status:', error);
      }
    };
  
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;
  
    return (
      <div className={styles.container}>
        <h1>Reports</h1>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Fiscal ID</th>
              <th>Client Number</th>
              <th>Approval</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
          {data.companies.map((company: any) => (
  <>
    <tr key={company.id}>
      <td>{company.name}</td>
      <td>{company.fiscalId}</td>
      <td>{company.clientNumber}</td>
      <td>
        {company?.approvals[0]?.approved ? (
          <span className={styles.approved}>Approved</span>
        ) : (
          <span className={styles.notApproved}>Not Approved</span>
        )}
      </td>
      <td>
        <button
          className={styles.approveButton}
          onClick={() => handleApprove(company.approvals[0].id)}
          disabled={company?.approvals[0]?.approved}
        >
          Approve
        </button>
      </td>
    </tr>
    {company.receipts.map((receipt: any) => (
      <tr key={receipt.id}>
        <td colSpan={2}>Receipt ID: {receipt.id}</td>
        <td>Tax Amount: {receipt.taxAmount}</td>
        <td>Tax Percentage: {receipt.taxPercentage}</td>
        <td>Date: {new Date(receipt.date).toLocaleDateString()}</td>
      </tr>
    ))}
  </>
))}
          </tbody>
        </table>
      </div>
    );
  };

  export default withApollo(ReportsPage);