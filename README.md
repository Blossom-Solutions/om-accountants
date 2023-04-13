# Project: Code Challenge - O&M Accountants

This project is a full-stack code challenge, consisting of a frontend application built with Next.js and a backend application built with NestJS. The main features of the frontend include sign in and register functionalities, a company report form, and an approvals section to approve company reports. Users can choose their role during registration, which determines their access level within the application.

The backend is built following Domain-Driven Design (DDD) concepts and hexagonal architecture, leveraging GraphQL, Prisma, and PostgreSQL.

## Getting Started

To run the project locally, you have two options: using Docker or running it manually.

### Option 1: Using Docker

Before running the project using Docker, create \`.env\` files in both the root repository and the \`server-om\` folder. Once the \`.env\` files are created, run the following command:
`docker-compose up`

### Option 2: Running Manually

To run the project manually, follow the instructions in both the \`server-om\` and \`client-om\` README files, remember to run prisma migrations which have been included.

## Project Overview

The purpose of this project is to showcase my software engineering skills and demonstrate my ability to create a well-structured, maintainable, and scalable application.

The folder structure in the \`server-om\` is designed to follow DDD and hexagonal architecture principles:

```
src
├── application
│ ├── interfaces
│ └── use-cases
├── config
├── domain
│ ├── Company
│ ├── Receipt
│ ├── Approval
│ └── User
├── infrastructure
│ ├── db
│ │ └── (repository services)
│ └── external
│ └── (external APIs)
└── modules
├── approval
│ ├── (module)
│ └── (resolver)
├── company
│ ├── (module)
│ └── (resolver)
├── receipt
│ ├── (module)
│ └── (resolver)
└── user
├── (module)
└── (resolver)
```

This structure allows for better separation of concerns, promotes code reusability, and makes it easier to maintain and scale the application over time.
When architecting this project, my primary goal was to create a maintainable, scalable, and modular system that followed best practices and design patterns. The chosen architecture was influenced by Domain-Driven Design (DDD) concepts and hexagonal architecture, which both emphasize separation of concerns and modularity.

## Domain-Driven Design (DDD)
In this project, I separated the different domains, such as Company, Receipt, Approval, and User, into their own dedicated folders under the src/domain directory. This separation allows for a more focused development of each domain's logic and ensures that changes in one domain have minimal impact on others.

## Hexagonal Architecture
This architecture emphasizes the separation of concerns between the application's different layers, making it easier to swap out implementations or add new features without affecting the core business logic.

In the server-om folder structure, I created separate directories for the different layers:

1. src/application: Contains the application's use-cases and interfaces for external services or repositories.
2. src/config: Houses the configuration files for the application.
3. src/infrastructure: Contains the implementation details of the infrastructure layer, such as database connections, repository services, and external APIs.
4. src/modules: Holds the NestJS modules and resolvers for each domain.

By following the hexagonal architecture, I aimed to create a project that is maintainable, scalable, and easy to understand, while also promoting a clean separation of concerns between the different layers.

## Benefits of this Architecture
The combination of DDD concepts and hexagonal architecture provides several benefits:

1. Separation of concerns: By separating the domain logic, application layer, and infrastructure, the architecture encourages a clean separation of concerns, making it easier to understand and maintain the project.
2. Modularity: The modular nature of the architecture promotes code reusability and makes it easier to add or modify features without affecting other parts of the system.
3. Scalability: The decoupled nature of the architecture allows for better scalability, as each domain and layer can evolve independently without impacting others.
4. Flexibility: With the decoupling of the application's core logic from external dependencies and frameworks, it becomes easier to swap out implementations or adapt to new technologies as needed.

Overall, the chosen architecture was designed to create a project that is easy to understand, maintain, and scale, while following industry best practices and design patterns.


## Improvements and Future Work

Although the project is functional and well-structured, there are some areas that could be improved:

1. Strict validation in some GraphQL resolvers: Enhance input validation to ensure that only valid data is processed by the server.
2. Test coverage: Although the test coverage is high, it does not yet reach 100%. Aim for full test coverage to ensure maximum reliability.
3. Frontend form validation: Improve form validation to provide users with immediate feedback on input errors and ensure data integrity.
4. Managing user state: Implement better state management for users to provide a more seamless experience and handle edge cases more gracefully.
5. (Feel free to add any other improvements or suggestions)
6. Integration tests as well as e2e tests didn't make it, but they are definitely an important part of the testing strategy.

I am constantly striving to improve my skills and deliver high-quality, professional software solutions. Any feedback is welcome and appreciated.

---

Thank you for considering my project. I am confident that my skills and experience will contribute positively to your organization. If you have any questions or concerns, please feel free to reach out.




