# mongo

http://tgrall.github.io/blog/2015/02/04/introduction-to-mongodb-security/

# create admin user
docker exec -it mongo mongo admin

use admin;
db.createUser({
  "user" : "cadmin",
  "pwd" : "cpass",
  roles : [
      {
          "role" : "userAdminAnyDatabase",
          "db" : "admin"
      }
  ]
});

exit

# create app user
docker exec -it mongo mongo admin -u cadmin -p cpass

use cdonut;

db.createUser({
  "user" : "cadmin",
  "pwd" : "cpass",
  roles : [
      {
          "role" : "readWrite",
          "db" : "cdonut"
      }
  ]
});