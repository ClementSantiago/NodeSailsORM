/**
 * UserTicketController
 *
 * @description :: Server-side logic for managing usertickets
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    // URL prefix to proceed
    _config: { prefix: '/api/helpdesk' },
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

        UserTicket.update({ id: req.query.ticketId }, { status_id: req.query.statusId }).exec(function updateTicketStatus(err, updated) {

            if (err) {
                return res.json({ 'success': false, 'message': err });
            }
            res.json({ 'success': true, 'message': 'Status Updated Successfully' });
        });
    },

    //update ModifiedBy User
    modifyModifiedBy: function (req, res) {

        UserTicket.update({ id: req.query.ticketId }, { modified_by: req.query.UserId }).exec(function updateModifiedBy(err, updated) {

            if (err) {
                return res.json({ 'success': false, 'message': err });
            }
            res.json({ 'success': true, 'message': 'User Updated Successfully' });
        });
    },

    //update AssignedTo User
    modifyAssignedTo: function (req, res) {

        UserTicket.update({ id: req.query.ticketId }, { assigned_to: req.query.UserId }).exec(function updateAssignedTo(err, updated) {

            if (err) {
                return res.json({ 'success': false, 'message': err });
            }
            res.json({ 'success': true, 'message': 'User Updated Successfully' });
        });
    },

    //update AssignedBy User
    modifyAssignedBy: function (req, res) {

        UserTicket.update({ id: req.query.ticketId }, { assigned_by: req.query.UserId }).exec(function updateAssignedBy(err, updated) {

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
            if (Object.keys(results).length == 0) {
                return res.json({ 'success': false, 'message': 'No Data fetched from DB' });
            }
            // console.log("Results == >"+results);
            res.json({ 'success': true, 'message': 'Retrived all User specific tickets Successfully', results });


        });
    },


    //getAllTicketsByStatus  'new' status UserTickets  order by priority severity
    getAllTicketsByStatus: function (req, res) {

        var queryAllUserTicket = UserTicket.find();
        queryAllUserTicket.where({ 'status': req.query.ticketStatus });
        queryAllUserTicket.sort('priority ASC');
        queryAllUserTicket.sort('severity ASC');
        queryAllUserTicket.exec(function callBack(err, results) {
            if (err) {
                return res.json({ 'success': false, 'message': err });
            }
            if (Object.keys(results).length == 0) {
                return res.json({ 'success': false, 'message': 'No Data fetched from DB' });
            }
            res.json({ 'success': true, 'message': 'Retrived all new tickets Successfully', results });
        });
    },

    //getAllTicketsByPriority  get all tickets by priority
    getAllTicketsByPriorityStatus: function (req, res) {

        var queryAllUserTicket = UserTicket.find();

        if (req.query.ticketStatus != undefined)
            queryAllUserTicket.where({ 'priority': req.query.ticketPriority, 'status': req.query.ticketStatus });
        else
            queryAllUserTicket.where({ 'priority': req.query.ticketPriority });

        queryAllUserTicket.sort('status ASC');
        queryAllUserTicket.exec(function callBack(err, results) {
            if (err) {
                return res.json({ 'success': false, 'message': err });
            }
            if (Object.keys(results).length == 0) {
                return res.json({ 'success': false, 'message': 'No Data fetched from DB' });
            }
            res.json({ 'success': true, 'message': 'Retrived all tickets by Priority Successfully', results });
        });
    },

    //getAllTicketsByPriority  get all tickets by priority
    getAllTicketsBySeverityStatus: function (req, res) {

        var queryAllUserTicket = UserTicket.find();

        if (req.query.ticketStatus != undefined)
            queryAllUserTicket.where({ 'severity': req.query.ticketSeverity, 'status': req.query.ticketStatus });
        else
            queryAllUserTicket.where({ 'severity': req.query.ticketSeverity });

        queryAllUserTicket.sort('status ASC');
        queryAllUserTicket.exec(function callBack(err, results) {
            if (err) {
                return res.json({ 'success': false, 'message': err });
            }
            if (Object.keys(results).length == 0) {
                return res.json({ 'success': false, 'message': 'No Data fetched from DB' });
            }
            res.json({ 'success': true, 'message': 'Retrived all tickets by Severity Successfully', results });
        });
    },
}

