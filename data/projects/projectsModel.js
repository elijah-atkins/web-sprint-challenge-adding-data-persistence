const db = require('../dbConfig');
const mappers = require("./mapper");

function getProjects(id) {
    let query = db('projects');
  
    if (id) {
      return query
        .where('id', id)
        .first()
        .then((project) => {
          if (project) {
            return mappers.projectToBody(project);
          } else {
            return null;
          }
        });
    } else {
      return query.then((projects) => {
        return projects.map((project) => mappers.projectToBody(project));
      });
    }
  }
  function insert(project) {
    return db("projects")
      .insert(project, "id")
      .then(([id]) => mappers.projectToBody({...project, id: id}));
  }

  function findResources(id) {

    return db('projects as p')
    .join('resource_list as rl', 'rl.project_id', 'p.id')
        .join('resources as r', 'rl.resource_id', 'r.id')
        .join('tasks as t', 'rl.task_id', 't.id')
        .select('t.description as task', 'r.name', 'r.description')
        .where('rl.project_id', '=', id)

}

// SELECT projects.name,
//        resources.name as resource,
//        resources.description
//   FROM projects
//        JOIN
//        resources on rl.resource_id = resources.id
//        JOIN
//        resource_list as rl ON rl.project_id = projects.id
//    where projects.id = 2

module.exports = {
    getProjects,
    insert,
    findResources
}