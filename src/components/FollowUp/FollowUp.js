import React, { Component } from 'react';

class FollowUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      url: '',
      description: '',
      followUps: []
    }
  }

  render() {
    const { index, removeFolloup, data, handleValueChange, templates, onSelect } = this.props;

    return (
      <div key={index} className="dynamic-add-campaign-add-follow-up-section" id="dynamic-add-campaign-add-follow-up-section">
          <div className="card mb-3">
              <div className="card-body">
                  <div className="card-header">
                      <i className="fa fa-times-circle d-flex justify-content-end" onClick={removeFolloup} aria-hidden="true"></i>
                    </div>            
                    <br />                            
                  <div className="form-group row">
                      <label htmlFor="follow-up-after" className="col-sm-3">Follow Up After</label>
                      <input type="number" value={data.number_of_days} onChange={handleValueChange.bind(this, index)} className="form-control col-sm-8" name="number_of_days" placeholder="1" required />
                      <small id="follow-up-after-help" className="form-text text-muted col-sm-1">Days</small>
                  </div>
                  <div className="form-group row">
                      <label htmlFor="template_id" className="col-sm-3"> Template</label>
                      <select className="form-control col-sm-9" onChange={handleValueChange.bind(this, index)} value={data.template_id} name="template_id">
                        <option value=""> Select </option>
                        {(templates.length > 0 || typeof templates.data !== 'undefined') && templates.data.templates.map((row, index) => {
                            return(
                              <option key={index} value={row.id}> {row.template_name} </option>
                            )
                          })
                        }
                      </select>
                  </div>
                  <div className="form-group row">
                      <span className="col-sm-3"></span>
                      <span className="col-sm-9">
                          <button className="btn btn-info ml-1" onClick={onSelect.bind(this, index, "{fullname | fallback:'ENTER FALLBACK HERE'}")}>Full Name</button>
                          <button className="btn btn-info ml-1" onClick={onSelect.bind(this, index, "{firstname | fallback:'ENTER FALLBACK HERE'}")}>First Name</button>
                          <button className="btn btn-info ml-1" onClick={onSelect.bind(this, index, "{lastname | fallback:'ENTER FALLBACK HERE'}")}>Last Name</button>
                          {/*<button className="btn btn-info ml-1" onClick={onSelect.bind(this, index, "{company | fallback:'ENTER FALLBACK HERE'}")}>Company</button>
                          <button className="btn btn-info ml-1" onClick={onSelect.bind(this, index, "{education | fallback:'ENTER FALLBACK HERE'}")}>Education</button>
                          <button className="btn btn-info ml-1" onClick={onSelect.bind(this, index, "{industries | fallback:'ENTER FALLBACK HERE'}")}>Industries</button>*/}
                          <button className="btn btn-info ml-1" onClick={onSelect.bind(this, index, "{location | fallback:'ENTER FALLBACK HERE'}")}>Location</button>
                          
                        </span>
                  </div>
                  <div className="form-group row">
                      <label htmlFor="campaign-message" className="col-sm-3">Follow Up Message</label>
                      <textarea className="form-control col-sm-9" rows={6} name="description" value={data.description} onChange={handleValueChange.bind(this, index)} placeholder="Description" required>
                      </textarea>
                  </div>
                                             
              </div>
          </div>
      </div>
    )
  }
}

export default FollowUp;
