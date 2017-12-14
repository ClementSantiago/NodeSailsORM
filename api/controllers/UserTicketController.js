/**
 * UserTicketController
 *
 * @description :: Server-side logic for managing usertickets
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    //Create new Ticket
    create: function (req, res) {

        UserTicket.create(req.params.all(), function userTicketCreated(err, userTicket) {
            if (err)
                return res.json({ 'success': false, 'message': err });
            res.json({ 'success': true, 'TicketNo': userTicket.id });

        });
    },

    //update ticket status
    modifyStatus: function (req, res) {

        UserTicket.update({ id: req.query.Id }, { status: req.query.Status }).exec(function updateTicketStatus(err, updated) {

            if (err) {
                return res.json({ 'success': false, 'message': err });
            }
            res.json({ 'success': true, 'message': 'Status Updated Successfully' });
        });
    },

    //update ModifiedBy User
    modifyModifiedBy: function (req, res) {

        UserTicket.update({ id: req.query.Id }, { modified_by: req.query.UserId }).exec(function updateModifiedBy(err, updated) {

            if (err) {
                return res.json({ 'success': false, 'message': err });
            }
            res.json({ 'success': true, 'message': 'User Updated Successfully' });
        });
    },

    //update AssignedTo User
    modifyAssignedTo: function (req, res) {

        UserTicket.update({ id: req.query.Id }, { assigned_to: req.query.UserId }).exec(function updateAssignedTo(err, updated) {

            if (err) {
                return res.json({ 'success': false, 'message': err });
            }
            res.json({ 'success': true, 'message': 'User Updated Successfully' });
        });
    },

    //update AssignedBy User
    modifyAssignedBy: function (req, res) {

        UserTicket.update({ id: req.query.Id }, { assigned_by: req.query.UserId }).exec(function updateAssignedBy(err, updated) {

            if (err) {
                return res.json({ 'success': false, 'message': err });
            }
            res.json({ 'success': true, 'message': 'User Updated Successfully' });
        });
    },

    //getAll UserTickets created by a User
    getAllUserTickets: function (req, res) {

        var queryAllUserTicket = UserTicket.find();
        queryAllUserTicket.where({ 'created_by': req.query.UserId });
        queryAllUserTicket.exec(function callBack(err, results) {
            if (err) {
                return res.json({ 'success': false, 'message': err });
            }
            // console.log("Results == >"+results);
            res.json({ 'success': true, 'message': 'Retrived all User specific tickets Successfully', results });


        });
    },


    //getAllTicketsByStatus  'new' status UserTickets  order by priority severity
    getAllTicketsByStatus: function (req, res) {

        var queryAllUserTicket = UserTicket.find();
        queryAllUserTicket.where({ 'status': req.query.ticket_status });
        queryAllUserTicket.sort('priority ASC');
        queryAllUserTicket.sort('severity ASC');
        queryAllUserTicket.exec(function callBack(err, results) {
            if (err) {
                return res.json({ 'success': false, 'message': err });
            }
            res.json({ 'success': true, 'message': 'Retrived all new tickets Successfully', results });
        });
    },

    //getAllTicketsByPriority  get all tickets by priority
    getAllTicketsByPriority: function (req, res) {

        var queryAllUserTicket = UserTicket.find();

        if (req.query.ticket_status != undefined)
            queryAllUserTicket.where({ 'priority': req.query.ticket_priority, 'status': req.query.ticket_status });
        else
            queryAllUserTicket.where({ 'priority': req.query.ticket_priority });

        queryAllUserTicket.sort('status ASC');
        queryAllUserTicket.exec(function callBack(err, results) {
            if (err) {
                return res.json({ 'success': false, 'message': err });
            }
            res.json({ 'success': true, 'message': 'Retrived all tickets by Priority Successfully', results });
        });
    },

    //getAllTicketsByPriority  get all tickets by priority
    getAllTicketsBySeverity: function (req, res) {

        var queryAllUserTicket = UserTicket.find();

        if (req.query.ticket_status != undefined)
            queryAllUserTicket.where({ 'severity': req.query.ticket_severity, 'status': req.query.ticket_status });
        else
            queryAllUserTicket.where({ 'severity': req.query.ticket_severity });

        queryAllUserTicket.sort('status ASC');
        queryAllUserTicket.exec(function callBack(err, results) {
            if (err) {
                return res.json({ 'success': false, 'message': err });
            }
            res.json({ 'success': true, 'message': 'Retrived all tickets by Severity Successfully', results });
        });
    },
}

