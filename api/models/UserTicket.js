/**
 * UserTicket.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    ticket_title: {
      type: 'string'
    },
    ticket_desc: {
      type: 'string'
    },
    status: {
      model: 'status'
    },
    asset: {
      model: 'asset'
    },
    priority: {
      model: 'priority'
    },
    severity: {
      model: 'severity'
    },
    created_by: {
      model: 'user'
    },
    created_dt: {
      type: 'date'
    },
    modified_by: {
      model: 'user'
    },
    modified_dt: {
      type: 'date'
    },
    assigned_to: {
      model: 'user'
    },
    assigned_by: {
      model: 'user'
    }
  }
};

