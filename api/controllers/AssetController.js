/**
 * AssetController
 *
 * @description :: Server-side logic for managing assets
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    // URL prefix to proceed
    _config: { prefix: '/api/helpdesk' },
    //Validate Asset
    validateAsset: function (req, res) {
        console.log("inside validat Asset");
        var queryAllAsset = Asset.find();
        queryAllAsset.where({ 'asset_name': req.query.Asset , 'assigned_to': req.query.UserId});
        console.log("inside validat Asset after where condition");
        queryAllAsset.exec(function callBack(err, results) {
            console.log("inside validat Asset after executionn");
            if (err) {
                return res.json({ 'success': false, 'message': err });
            }
            if (Object.keys(results).length == 0) {
                return res.json({ 'success': false, 'message': 'No Asset fetched from DB' });
            }
            // console.log("Results == >"+results);
            res.json({ 'success': true, 'message': 'Retrived all User specific tickets Successfully', results });


        }); 
    },
};

