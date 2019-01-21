/* eslint-disable class-methods-use-this */
class UsersController {
  getIndex(req, res) {
    res.send('Welcome !');
  }

  register(req, res){
    res.send('Reister');
  }

  login(req, res){
    res.send('Login');
  }
}

const UserController = new UsersController();


export default UserController;
