# Adding Data Persistence Sprint Challenge

**Read these instructions carefully. Understand exactly what is expected _before_ starting this Sprint Challenge.**

This challenge allows you to practice the concepts and techniques learned over the past sprint and apply them in a concrete project. This sprint explored **Data Persistence**. During this sprint, you studied **RDBMS, including SQL, multi-table queries, and data modeling**. In your challenge this week, you will demonstrate your mastery of these skills by creating **a database based on given specifications**.

This is an individual assessment. All work must be your own. Your challenge score is a measure of your ability to work independently using the material covered through this sprint. You need to demonstrate proficiency in the concepts and objectives introduced and practiced in preceding days.

You are not allowed to collaborate during the sprint challenge. However, you are encouraged to follow the twenty-minute rule and seek support from your TL if you need direction.

_You have **three hours** to complete this challenge. Plan your time accordingly._

## Introduction

In this project you will be given a set of requirements and must design a database to satisfy them. As a part of this process you'll also build an API with endpoints to access the data.

### Entities

A `project` is what needs to be done. We want to store the following data about a `project`:

- [x] a unique ID.
- [x] a name. This column is required.
- [x] a description.
- [x] a boolean that indicates if the project has been completed. This column cannot be NULL, the default value should be `false`.

A `resource` is anything needed to complete a project, some examples are: a person, a tool, a meeting room or a software license. We want to store the following data about a `resource`:

- [x] a unique ID.
- [x] a name. This column is required.
- [x] a description.

The database should not allow resources with duplicate names.

A `task` one of the steps needed to complete the project. We want to store the following data about an `task`.

- [x] a unique ID.
- [x] a description of what needs to be done. This column is required.
- [x] a notes column to add additional information.
- [x] a boolean that indicates if the task has been completed. This column cannot be NULL, the default value should be `false`.

### Commits

Commit your code regularly and meaningfully. This helps both you (in case you ever need to return to old code for any number of reasons) and your team lead as the evaluate your solution.

## Interview Questions

Be prepared to demonstrate your understanding of this week's concepts by answering questions on the following topics. You might prepare by writing down your own answers before hand.

1. Explain the difference between `Relational Databases` and `SQL`.

  A relational database is a database structured with shcema to recognize relations among stored items of information.  
  SQL(Structured Query Language) is a language used in programming to manage a relational database

2. Why do tables need a `primary key`?

  a table needs a primary key to uniquely identify each table record

3. What is the name given to a table column that references the primary key on another table.

  foreign key

4. What do we need in order to have a _many to many_ relationship between two tables.

  We need a third table to join the other two tables and go from one many to many relationship to two one to many relationships

You are expected to be able to answer questions in these areas. Your responses contribute to your Sprint Challenge grade.

## Instructions

### Task 1: Project Set Up

- [x] Create a forked copy of this project
- [ ] Add your team lead as collaborator on Github
- [x] Clone your OWN version of the repository (Not Lambda's by mistake!)
- [x] Create a new branch: git checkout -b `<firstName-lastName>`.
- [x] Implement the project on your newly created `<firstName-lastName>` branch, committing changes regularly
- [x] Push commits: git push origin `<firstName-lastName>`

### Task 2: Project Requirements

Your finished project must include all of the following requirements:

- [x] Design the data model and use _knex migrations_ to create the database and tables needed to satisfy the following business rules:
  - [x] a `project` can have multiple `tasks`.
  - [x] a `task` belongs to only one `project`.
  - [x] a `project` can use multiple `resources`. Example of `resources` are: computer, conference room, microphone, delivery van.
  - [x] the same `resource` can be used in multiple `projects`.
  - [x] when adding `projects` the client must provide a name, the description is optional.
  - [x] when adding `resources` the client must provide a name, the description is optional.
  - [x] when adding a `task` the client must provide a description, the notes are optional.
  - [x] when adding a `task` the client must provide the `id` of an existing project.
  - [x] for `projects` and `tasks` if no value is provided for the `completed` property, the API should provide a default value of `false`.
- [x] Build an API with endpoints for:
  - [x] adding resources.
  - [x] retrieving a list of resources.
  - [x] adding projects.
  - [x] retrieving a list of projects.
  - [x] adding tasks.
  - [x] retrieving a list of tasks. **The list of tasks should include the project name and project description**.

In your solution, it is essential that you follow best practices and produce clean and professional results. You will be scored on your adherence to proper code style and good organization. Schedule time to review, refine, and assess your work and perform basic professional polishing including spell-checking and grammar-checking on your work. It is better to submit a challenge that meets MVP than one that attempts too much and does not.

### Task 3: Stretch Goals

After finishing your required elements, you can push your work further. These goals may or may not be things you have learned in this module but they build on the material you just studied. Time allowing, stretch your limits and see if you can deliver on the following optional goals:

- [ ] Add an endpoint to get a list of project resources.

SELECT projects.name,
       resources.name as resource,
       resources.description
  FROM projects
       JOIN
       resources on rl.resource_id = resources.id
       JOIN
       resource_list as rl ON rl.project_id = projects.id
   where projects.id = 2

- [ ] Add an endpoint to get a list of project tasks.

SELECT projects.name,
       tasks.description,
       tasks.completed
  FROM projects
       JOIN
       tasks ON tasks.project_id = projects.id
 WHERE projects.id = 2;

- [ ] Add an endpoint to see all projects using a particular resource.
SELECT projects.name,
       resources.name AS resource,
       resources.description
  FROM projects
       JOIN
       resources ON resource_list.resource_id = resources.id
       JOIN
       resource_list ON resource_list.project_id = projects.id
 WHERE resources.id = 5;

  
- [x] Add support for assigning `resources` directly to `tasks` in addition to adding them to `projects`

## Submission format

Follow these steps for completing your project.

- [x] Submit a Pull-Request to merge <firstName-lastName> Branch into master (student's Repo). **Please don't merge your own pull request**
- [x] Add your team lead as a reviewer on the pull-request
- [x] Your team lead will count the project as complete after receiving your pull-request


## Api Endpoints

| Method | URL | Description | 

|-------------------------------------------------------------- |

| POST   | /api/projects     | Creates a project using the information sent inside the `request body`.                                   |
| GET    | /api/projects     | Returns an array of projects.                                                                                |
| GET    | /api/projects/:id | Returns the project object with the specified `id`.  

|-------------------------------------------------------------- |

| POST   | /api/tasks     | Creates a task using the information sent inside the `request body`.                                   |
| GET    | /api/tasks     | Returns an array of tasks.        

|-------------------------------------------------------------- |

| POST   | /api/resources     | Creates a resource using the information sent inside the `request body`.                                   |
| GET    | /api/resources     | Returns an array of resources.        