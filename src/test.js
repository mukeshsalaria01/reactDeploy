
import React, { Component } from 'react';
import ItemService from './service';
import { Button, Modal } from 'react-bootstrap';

class Ribbon extends Component {

    constructor(props) {
        super(props);


        this.itemService = new ItemService();
        this.setShow = this.setShow.bind(this);
        this.chackToken = this.chackToken.bind(this);
        this.onPageOpen = this.onPageOpen.bind(this);
        this.login = this.login.bind(this);
        this.refreshToken = this.refreshToken.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.state = {
            showDetails: false,
            showLogin: false,
            showError: false,
            open: false,
            show: false,
            searchable: false,
            virtual: false
        }
    }

    handleChange({ target }) {
        this.setState({
            [target.name]: target.value
        });
    }


    render() {
        const showDetails = this.state.showDetails;
        const showLogin = this.state.showLogin;
        const showError = this.state.showError;
        const show = this.state.show;

        return (
            <>
                <div className="collapse" id="collapseExample">
                    <div className="card bg-dark text-white rounded-0">
                        <div className="container">
                            <div className="card-body">

                                {showLogin && <form id="login" >
                                    <div className="form-row">
                                        <div className="col">
                                            <input type="text" className="form-control" name="Username" placeholder="User Name" value={this.state.username}
                                                onChange={this.handleChange} />
                                        </div>
                                        <div className="col">
                                            <input type="password" className="form-control" name="Password" placeholder="Password" value={this.state.password} onChange={this.handleChange} />
                                        </div>
                                        <div className="col">
                                            <button type="button" id="btnLogin1" onClick={this.login} style={{ backgroundColor: '#1baa81' }} className="btn btn-secondary">Log In</button>
                                        </div>
                                    </div>
                                    {showError && <span id="logInError"> Invalid username & password.</span>}

                                </form>}

                                {showDetails && <div className="dropdown"><button className="btn btn-secondary" style={{ backgroundColor: '#1baa81' }} type="button" onClick={this.onPageOpen}>Page Property</button></div>}

                            </div>
                        </div>
                    </div>
                </div>
                <button onClick={this.chackToken} className="btn bg-dark text-white float-right collapse-btn" type="button" id="collapse-button" data-toggle="collapse"
                    data-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample" >
                    <span >+</span>
                </button>


                <Modal
                    show={show}
                    onHide={this.setShow}
                    dialogClassName="modal-90w"
                    aria-labelledby="example-custom-modal-styling-title">
                    <Modal.Header closeButton>
                        <Modal.Title id="example-custom-modal-styling-title">
                            Page Properties
                    </Modal.Title>
                    </Modal.Header>
                    <Modal.Body style={{ marginLeft: '20%' }}>

                        <div className="form-group row">
                            <div className="col-md-6 row">Page Name</div>
                            <div className="col-md-6">
                                <input type="text" className="from-control" readOnly value={this.state.PageName} ></input>
                            </div>
                        </div>
                        <div className="form-group row">
                            <div className="col-md-6 row">Page Display Name</div>
                            <div className="col-md-6">
                                <input type="text" className="from-control" readOnly id="txtPageDisplayName" value={this.state.PageDisplayName} ></input>
                            </div>
                        </div>
                        <div className="form-group row">
                            <div className="col-md-6 row">Discription</div>
                            <div className="col-md-6">
                                <input type="text" className="from-control" readOnly id="txtDiscription" value={this.state.Discription} ></input>
                            </div>
                        </div>
                        <div className="form-group row">
                            <div className="col-md-6 row">Searchable</div>
                            <div className="col-md-6">
                                <input type="checkbox" className="from-control" id="chkSearchable" defaultChecked={this.state.searchable} onChange={this.handleChangeChk}></input>
                            </div>
                        </div>
                        <div className="form-group row">
                            <div className="col-md-6 row">Virtual</div>
                            <div className="col-md-6">
                                <input className="from-control" type="checkbox" id="chkVirtual" defaultChecked={this.state.virtual} onChange={this.handleChangeChk12}></input>
                            </div>
                        </div>
                    </Modal.Body>
                </Modal>
            </>
        );
    }



    login() {
        var data = {
            username: this.state.Username,
            password: this.state.Password
        };
        this.itemService.login(data).then(item => {
            if (item != undefined && item.username != null) {
                window.localStorage.refreshToken = item.refreshToken;
                window.localStorage.token = item.accessToken;
                this.setState({
                    showDetails: true,
                    showLogin: false
                });
            }
            else {
                this.setState({
                    showError: true,
                    showDetails: false,
                    showLogin: true
                });
            }
        });
    }

    chackToken() {
        this.itemService.validateToken().then(item => {
            if (item != undefined && item.username != null) {
                window.localStorage.refreshToken = item.refreshToken;
                window.localStorage.token = item.accessToken;
                this.setState({
                    showDetails: true,
                    showLogin: false
                });
            }
            else {
                this.setState({
                    showDetails: false,
                    showLogin: true
                });
            }
        });
    }

    refreshToken() {
        this.itemService.refreshToken().then(item => {
            if (item != undefined && item.username != null) {
                window.localStorage.refreshToken = item.refreshToken;
                window.localStorage.token = item.accessToken;
                this.setState({
                    showDetails: true,
                    showLogin: false
                });
            } else {
                this.setState({
                    showDetails: false,
                    showLogin: true
                });
            }
        });
    }

    onPageOpen() {
        this.itemService.pageProperty().then(item => {
            if (item) {

                if (item.data.searchable) {
                    this.setState({
                        searchable: true
                    });
                }


                if (item.data.virtual) {
                    this.setState({
                        virtual: true
                    });
                }

                this.setState({
                    show: true,
                    PageName: item.data.nodeName,
                    PageDisplayName: item.data.displayName,
                    Discription: item.data.description,
                    //uuid: item.data.UUID
                });
            } else {
                this.setState({
                    showDetails: false,
                    showLogin: true
                });
            }
        });
    }

    setShow() {
        this.setState({
            show: !this.state.show
        });
    }


}

export default Ribbon;