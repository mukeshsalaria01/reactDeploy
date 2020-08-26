
import React, { Component } from 'react';
import ItemService from './service';
import { Modal } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
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
            show: false,
            searchable: false,
            virtual: false,
            open: false
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
        const open = this.state.open;

        return (
            <>
                <section className="togglenav-section-area">
                    {open && <div className="nav-area">
                        <div align="center">

                            {showLogin && <form id="login" >
                            <input type="text" placeholder="User Name" name="Username" className="input-field" value={this.state.username} onChange={this.handleChange} />
                            <input type="password" placeholder="Password" name="Password" className="input-field" value={this.state.password} onChange={this.handleChange} />
                            <button type="button" className="login-btn-area" onClick={this.login}>Log In</button>
                            </form>}
                            {showDetails && <button type="button" className="login-btn-area" onClick={this.onPageOpen}>Page Property</button>}

                        </div>
                        {showError && <span id="logInError"> Invalid username & password.</span>}
                    </div>}

                    <div onClick={this.chackToken} className="toggle-btn-area"><span className="plus-icon-area">+</span></div>
                    
                </section>

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
        this.setState({
            open: !this.state.open
        });
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