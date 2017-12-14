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
            console.log("req param" + req.params.all());
            if (err)
                return res.serverError(err);
            res.json({ 'TicketNo': userTicket.id });

        });
    },

    //update ticket status
    modifyStatus: function (req, res) {
        console.log("ID" + req.query.Id);
        UserTicket.update({ id: req.query.Id }, { status: req.query.Status }).exec(function afterwards(err, updated) {

            if (err) {
                res.serverError(err);
            }
            res.json({ 'status': 'Status Updated Successfully' });
        });
    },

    //update ModifiedTo User
    modifyModifiedTo: function (req, res) {
        console.log("UserId" + req.query.UserId);
        UserTicket.update({ id: req.query.Id }, { status: req.query.UserId }).exec(function afterwards(err, updated) {

            if (err) {
                res.serverError(err);
            }
            res.json({ 'status': 'User Updated Successfully' });
        });
    },

    //update AssignedTo User
    modifyAssignedTo: function (req, res) {
        console.log("UserId" + req.query.UserId);
        UserTicket.update({ id: req.query.Id }, { status: req.query.UserId }).exec(function afterwards(err, updated) {

            if (err) {
                res.serverError(err);
            }
            res.json({ 'status': 'User Updated Successfully' });
        });
    },

    //update AssignedBy User
    modifyAssignedBy: function (req, res) {
        console.log("UserId" + req.query.UserId);
        UserTicket.update({ id: req.query.Id }, { status: req.query.UserId }).exec(function afterwards(err, updated) {

            if (err) {
                res.serverError(err);
            }
            res.json({ 'status': 'User Updated Successfully' });
        });
    },

    //getAll UserTickets created by a User
    getAllUserTickets: function (req, res, next) {
        console.log("ID" + req.query.createdId);

        var queryAllUserTicket = UserTicket.find();
        queryAllUserTicket.where({ 'created_by': req.query.UserId });
        queryAllUserTicket.exec(function callBack(err, results) {
             res.json(results);
        });
    },


     //getAllUserNewTickets  'new' status UserTickets  order by priority severity
    getAllUserNewTickets: function (req, res, next) {
        //console.log("ID" + req.query.createdId);
        ticket_status = 3 ; //'new'

        var queryAllUserTicket = UserTicket.find();
        queryAllUserTicket.where({ 'status': ticket_status });
        queryAllUserTicket.sort('priority ASC');
        queryAllUserTicket.sort('severity ASC');
        queryAllUserTicket.exec(function callBack(err, results) {
        res.json(results);
        });
    },
}

