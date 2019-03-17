import React, { Component } from 'react';
import axios from 'axios';
import moment from 'moment';

class FormPage extends Component {

  state = { guestList: [], searchGuestList: [] }

  componentDidMount() {
    this.showGuests();
  }

  //Fungsi menampilkan list Guest
  showGuests = () => {
    axios.get('http://localhost:1988/getguests')
          .then((res) => {
              console.log(res);
              this.setState({ 
                  guestList: res.data,
                  searchGuestList: res.data
              });
          }).catch((err) => {
              console.log(err);
          })
  }

  //Fungsi Add guest
  onBtnAddClick = (e) => {
    e.preventDefault();
    const nama = this.refs.addNama.value;
    const telp = this.refs.addTelp.value;
    const pesan = this.refs.addPesan.value;
    if(nama) {
        axios.post('http://localhost:1988/createguest', {
            nama, telp, pesan
        }).then((res) => {
            console.log(res);
            this.showGuests();
            document.getElementById('listGuestBook').scrollIntoView();
        }).catch((err) => {
            console.log(err);
        })
    } else alert('Please fill all fields.')
  
    this.refs.formAdd.reset();
    this.refs.addNama.focus();
  }

  //Render map guestList
  renderGuestList = () => {
    var guestListJSX = this.state.searchGuestList.map((item, x) => {
      return(
        <tr key={item.id}>
          <td>{x+1}</td>
          <td>{moment(item.waktu).format('D MMM YYYY, H:mm:ss')}</td>
          <td>{item.nama}</td>
          <td>{item.telp}</td>
          <td>{item.pesan}</td>
        </tr>
      )
    });
    return guestListJSX;
}

//Fungsi pencarian by nama
onKeyUpSearch = () => {
  var nama = this.refs.qNama.value;
  var arrSearch;

  arrSearch = this.state.guestList.filter((e) => {

      return e.nama.toLowerCase().includes(nama.toLowerCase()) 
      
  })

  this.setState({ searchGuestList: arrSearch })
}

  render() {
    return (
      <div className="container-contact100" id="top">
        <div className="wrap-contact100">
          <form className="contact100-form validate-form" ref="formAdd" onSubmit={this.onBtnAddClick}>
            <span className="contact100-form-title">
              Add Guest Book
            </span>
            <div className="wrap-input100 validate-input">
              <input className="input100" id="name" type="text" name="name" ref="addNama" placeholder="Nama"/>
              <label className="label-input100" htmlFor="name">
                <span className="lnr lnr-user" />
              </label>
            </div>
            <div className="wrap-input100 validate-input">
              <input className="input100" id="telp" type="text" name="telp" ref="addTelp" placeholder="Telepon"/>
              <label className="label-input100" htmlFor="phone">
                <span className="lnr lnr-phone-handset" />
              </label>
            </div>
            <div className="wrap-input100 validate-input">
              <textarea className="input100" name="message" ref="addPesan" placeholder="Your message..."/>
            </div>
            <div className="container-contact100-form-btn">
              <div className="wrap-contact100-form-btn">
                <div className="contact100-form-bgbtn" />
                <button className="contact100-form-btn">
                  Submit
                </button>
              </div>
            </div>
          </form>
          <div style={{ marginTop: "40px" }} className="col-lg-12 card shadow p-3 mb-5 bg-white rounded">
          <span className="contact100-form-title" id="listGuestBook">
            List Guest Book
          </span>
          <a id="addGuest" href="#top" style={{ fontSize: '20px' }}>
            <span role="img" aria-label="Panda">➕ Add more guest</span>
          </a>
          <br/>
          {/* Form pencarian by nama */}
          <form id="searchForm">
          <input type="text" className="form-control form-control-lg"
                  placeholder="Cari berdasarkan nama"
                  ref="qNama" onKeyUp={() => {this.onKeyUpSearch()}} />
          </form>
          <br/>
          {/* List Guest Book */}
          <div className="table-responsive">
              <table className="table table-bordered table-hover">
                  <thead className="thead-dark">
                      <tr>
                        <th><center>No.</center></th>
                        <th><center>Waktu</center></th>
                        <th><center>Nama</center></th>
                        <th><center>Telp</center></th>
                        <th><center>Pesan</center></th>
                      </tr>
                  </thead>
                  <tbody>
                          {this.renderGuestList()}
                  </tbody> 
              </table>
          </div>
      </div>
          <br/><br/>
          Made with 💖 By Gamma Rinaldi 2019
        </div>
      </div>
    )
  }
}

export default FormPage;

