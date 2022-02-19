import React from 'react';
import { Grid } from '@material-ui/core';
import Modal from '@material-ui/core/Modal';
// import button from '@material-ui/core/button';
// import { table, thead, Tbody, tr, th, td } from 'react-super-responsive-table';
// import Modal from "@material-ui/core/Modal";
// import "./node_modules/react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import { Audio } from 'react-loader-spinner'
import axios from 'axios';
// import {Loader} from "./loader/index.js"

class Header extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            openStuMod: false,
            studentData: {},
            error_msg: ""
        }

    }

    componentDidMount() {
        this.getAllStuDetail();
    }

    handleModelOpen = () => {
        this.setState({ openStuMod: true, studentData: {}, error_msg: "" })
    }

    handleModelClose = () => {
        this.setState({ openStuMod: false, error_msg: "" })
    }

    updateEntry1 = (e, name) => {
        const state = this.state.studentData;
        state[name] = e.target.value;
        this.setState({ studentData: state });

    }

    handleSubmit = () => {
        this.setState({ error_msg: "" })
        let data = this.state.studentData
        if (this.state.studentData?._id) {
            let id = this.state.studentData?._id;
            axios.put(`http://localhost:4000/students-data/${id}`, data,
            )
                .then((response) => {
                    this.setState({ studentData: {} })
                    this.handleModelClose();
                    this.getAllStuDetail();
                }).catch((error) => {
                    console.log(error);
                })
        } else {

            if (data && data.student_name && !data?.student_name == "") {
                if (data && data.email && !data?.email == "") {
                    if (data && data.phoneno && !data?.phoneno == "") {
                        if (data && data.class && !data?.class == "") {
                            if (data && data.marks && !data?.marks == "") {
                                axios.post(`http://localhost:4000/students-data`,
                                    data
                                )
                                    .then((response) => {
                                        this.setState({ studentData: {} })
                                        this.handleModelClose();
                                        this.getAllStuDetail();
                                    }).catch((error) => {
                                        console.log(error);
                                    })
                            }
                            else {
                                this.setState({ error_msg: "Please enter Marks" })
                            }
                        }
                        else {
                            this.setState({ error_msg: "Please enter Class Opted" })
                        }
                    }
                    else {
                        this.setState({ error_msg: "Please enter Phone Number" })

                    }
                }
                else {
                    this.setState({ error_msg: "Please enter Email" })
                }
            }
            else {
                this.setState({ error_msg: "Please enter Student Name" })
            }
        }
    }

    getAllStuDetail = () => {
        axios.get(`http://localhost:4000/students-data`)
            .then((response) => {
                if (response?.data) {
                    console.log("reponse", response.data)
                    this.setState({ allData: response?.data?.data })
                }
            })
            .catch((error) => {
            })
    }

    editStuDetail = (data, index) => {
        console.log("data", data)
        this.setState({ openStuMod: true, studentData: data })
    }

    deleteStuDetail = (id) => {
        axios.delete(`http://localhost:4000/students-data/${id}`
        )
            .then((response) => {
                this.setState({ studentData: {} })
                this.getAllStuDetail();
            }).catch((error) => {
                console.log(error);
            })

    }

    render() {
        const { allData } = this.state;
        return (
            <Grid>
                <Grid className="heading">
                    <Grid item xs={12} md={3}>
                        <h2>Enrollment App</h2>
                    </Grid>
                    <Grid className="btnNewStu">
                        <button onClick={this.handleModelOpen}>New Student</button>
                    </Grid>

                    <table border="1" width="100%" className="tabL1">
                        <tr>
                            <th>S No.</th>
                            <th>Student Name</th>
                            <th>Email</th>
                            <th>Phone#</th>
                            <th>Class</th>
                            <th>Marks%</th>
                            <th>Edit</th>
                            <th>Delete</th>
                        </tr>
                        {this.state.allData && this.state.allData.length > 0 && this.state.allData.map((items, index) => (
                            <tr>
                                <td>{index}</td>
                                <td>{items?.student_name}</td>
                                <td>{items?.email}</td>
                                <td>{items?.phoneno}</td>
                                <td>{items?.class}</td>
                                <td>{items?.marks}</td>
                                <td><button onClick={() => this.editStuDetail(items, index)} className="editbtn">Edit</button></td>
                                <td><button onClick={() => this.deleteStuDetail(items?._id)} className="editbtn">Delete</button></td>
                            </tr>
                        ))}
                    </table>
                    {/* <Audio
                        className="audload"
                        heigth="100"
                        width="100"
                        color='grey'
                        ariaLabel='loading'
                    /> */}

                </Grid>

                <Modal
                    open={this.state.openStuMod}
                    onClose={this.handleModelClose}>
                    <Grid className="addServContnt">
                        <Grid className="addSpeclContntIner">

                            <Grid className="addSpeclClose">
                                <a onClick={this.handleModelClose}>
                                    <img
                                        src={require('../../assets/images/closefancy.png')}
                                        alt="close"
                                        title=""
                                    />
                                </a>
                            </Grid>
                            <Grid className="wholeMod">
                                <Grid className="modTitle">
                                    <label>Add Student Details</label>
                                </Grid>
                                <Grid className="borderline"></Grid>
                                <div className="err_message">{this.state.error_msg}</div>


                                <Grid>
                                    <Grid>
                                        <Grid>
                                            <label>Student Name</label>
                                            {/* <Loader /> */}
                                        </Grid>
                                        <Grid>
                                            <input
                                                type="text"
                                                id="fname"
                                                name="student_name"
                                                onChange={(e) => { this.updateEntry1(e, "student_name") }}
                                                value={this.state.studentData?.student_name}
                                            />
                                        </Grid>
                                        <Grid>
                                            <label>Father's Name</label>
                                        </Grid>
                                        <Grid>
                                            <span> <input
                                                type="text"
                                                id="fname"
                                                name="father_name"
                                                onChange={(e) => { this.updateEntry1(e, "father_name") }}
                                                value={this.state.studentData?.father_name}
                                            /></span>
                                        </Grid>
                                        <Grid>
                                            <label>Dob</label>
                                        </Grid>
                                        <Grid>
                                            <span>
                                                <input
                                                    type="date"
                                                    id="fname"
                                                    name="date_of_birth"
                                                    onChange={(e) => { this.updateEntry1(e, "date_of_birth") }}
                                                    value={this.state.studentData?.date_of_birth ? this.state.studentData?.date_of_birth : new Date()}
                                                /></span>
                                        </Grid>
                                        <Grid>
                                            <label>Address</label>
                                        </Grid>
                                        <Grid>
                                            <span> <input
                                                type="text"
                                                id="fname"
                                                name="address"
                                                onChange={(e) => { this.updateEntry1(e, "address") }}
                                                value={this.state.studentData?.address}
                                            /></span>
                                        </Grid>
                                        <Grid>
                                            <label>City</label>
                                        </Grid>
                                        <Grid>
                                            <span>
                                                <input
                                                    type="text"
                                                    id="fname"
                                                    name="city"
                                                    onChange={(e) => { this.updateEntry1(e, "city") }}
                                                    value={this.state.studentData?.city}
                                                /></span>
                                        </Grid>
                                        <Grid>
                                            <label>State</label>
                                        </Grid>
                                        <Grid>
                                            <span>
                                                <input
                                                    type="text"
                                                    id="fname"
                                                    name="state"
                                                    onChange={(e) => { this.updateEntry1(e, "state") }}
                                                    value={this.state.studentData?.state}
                                                /></span>
                                        </Grid>
                                        <Grid>
                                            <label>Pin</label>
                                        </Grid>
                                        <Grid>
                                            <span>
                                                <input
                                                    type="text"
                                                    id="fname"
                                                    name="pin"
                                                    onChange={(e) => { this.updateEntry1(e, "pin") }}
                                                    value={this.state.studentData?.pin}
                                                /></span>
                                        </Grid>
                                        <Grid>
                                            <label>Phone No</label>
                                        </Grid>
                                        <Grid>
                                            <span>
                                                <input
                                                    type="number"
                                                    id="fname"
                                                    name="phoneno"
                                                    onChange={(e) => { this.updateEntry1(e, "phoneno") }}
                                                    value={this.state.studentData?.phoneno}
                                                /></span>
                                        </Grid>
                                        <Grid>
                                            <label>Email</label>
                                        </Grid>
                                        <Grid>
                                            <span>
                                                <input
                                                    type="text"
                                                    id="fname"
                                                    name="email"
                                                    onChange={(e) => { this.updateEntry1(e, "email") }}
                                                    value={this.state.studentData?.email}
                                                /></span>
                                        </Grid>
                                        <Grid>
                                            <label>Class Opted</label>
                                        </Grid>
                                        <Grid>
                                            <span>
                                                <input
                                                    type="text"
                                                    id="fname"
                                                    name="class"
                                                    onChange={(e) => { this.updateEntry1(e, "class") }}
                                                    value={this.state.studentData?.class}
                                                /></span>
                                        </Grid>
                                        <Grid>
                                            <label>Marks %</label>
                                        </Grid>
                                        <Grid>
                                            <span>
                                                <input
                                                    type="number"
                                                    id="fname"
                                                    name="marks"
                                                    onChange={(e) => { this.updateEntry1(e, "marks") }}
                                                    value={this.state.studentData?.marks}
                                                /></span>
                                        </Grid>
                                        <Grid>
                                            <label>Date Enrolled</label>
                                        </Grid>
                                        <Grid>
                                            <span>
                                                <input
                                                    type="date"
                                                    id="fname"
                                                    name="date"
                                                    onChange={(e) => { this.updateEntry1(e, "date_enrolled") }}
                                                    value={this.state.studentData?.date_enrolled ?
                                                        this.state.studentData?.date_enrolled :
                                                        new Date()}
                                                /></span>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid className="saveBtn">
                                <button onClick={() => { this.handleSubmit() }}>Submit Data</button>
                            </Grid>
                        </Grid>
                    </Grid>
                </Modal>
            </Grid >


        )
    }
}


export default Header;