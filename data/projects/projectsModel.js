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
        .join('resource_list as rl', 'p.id', 'rl.project_id')
        .join('resources as r', 'p.id', 'rl.resource_id')
        .select('p.name', 'r.name as resource', 'r.description')
        .where({ project_id: id });
}

module.exports = {
    getProjects,
    insert,
    findResources
}