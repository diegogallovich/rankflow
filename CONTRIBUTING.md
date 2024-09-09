# Contributing to Rankflow

We're excited that you're interested in contributing to Rankflow! This document provides guidelines for contributing to the project. Please take a moment to review this document to make the contribution process easy and effective for everyone involved.

## Code of Conduct

By participating in this project, you are expected to uphold our Code of Conduct. Please report unacceptable behavior to [project_email@example.com].

## Getting Started

1. Fork the repository on GitHub.
2. Clone your fork locally:
   ```
   git clone https://github.com/your-username/rankflow.git
   cd rankflow
   ```
3. Create a new branch for your feature or bug fix:
   ```
   git checkout -b feature/your-feature-name
   ```
4. Make your changes and commit them using conventional commit messages (see below).
5. Push your branch to your fork on GitHub:
   ```
   git push origin feature/your-feature-name
   ```
6. Open a pull request from your fork to the main Rankflow repository.

## Development Setup

Follow the instructions in the README.md file to set up your development environment. Additionally, ensure that Husky hooks are executable:

## Coding Standards

- We use ESLint and Prettier to maintain code quality and consistency.
- Run `npm run lint` to check your code for any linting errors.
- Run `npm run format` to automatically format your code.
- Ensure your code passes all existing tests and add new tests for new features.

## Commit Message Guidelines

We follow the [Conventional Commits](https://www.conventionalcommits.org/) specification. This leads to more readable messages that are easy to follow when looking through the project history.

Each commit message consists of a **header**, a **body** and a **footer**. The header has a special format that includes a **type**, a **scope** and a **subject**:

```
<type>(<scope>): <subject>
<BLANK LINE>
<body>
<BLANK LINE>
<footer>
```

Example:

```
feat(auth): add login functionality

Implement user login using Logto authentication service.
This includes:
- Login form component
- Authentication hooks
- Protected route middleware

Closes #
```
