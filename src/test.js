
import React, {Component} from 'react';
import ItemService from './service';



class Ribbon extends Component {
  
  constructor(props) {
    super(props);
    this.itemService = new ItemService();   
    this.onCreateItem = this.onCreateItem.bind(this);

  }
  render() {
        return (
                 <>
                    <div className="collapse" id="collapseExample">
                        <div className="card bg-dark text-white rounded-0">
                            <div className="container">
                                <div className="card-body">

                                    <form id="login">
                                        <div className="form-row">
                                            <div className="col">
                                                <input type="text" className="form-control" id="userName" placeholder="User Name" />
                                            </div>
                                            <div className="col">
                                                <input type="password" className="form-control" id="password" placeholder="Password" />
                                            </div>
                                            <div className="col">
                                                <button type="button" id="btnLogin1" className="btn btn-secondary">Log In</button>
                                            </div>
                                        </div>
                                        <span id="logInError"></span>
                                    </form>

                                    <div className="dropdown hidden" id="dropdown">
                                        <button className="btn btn-secondary" type="button" id="pagePropertyModel">
                                            Page Property
							</button>

                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                    <button onClick={this.onCreateItem} className="btn bg-dark text-white float-right collapse-btn" type="button" id="collapse-button" data-toggle="collapse"
                        data-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample">
                        <span >+</span>
                    </button>
                 </>
            
        );
  }
    onCreateItem(newItem) {   
    this.itemService.createItem(newItem).then(item => {
        
      }
    );
  }
  
}

export default Ribbon;