/*

	This file is a part of node-on-train project.

	Copyright (C) 2013 Thanh D. Dang <thanhdd.it@gmail.com>

	node-on-train is free software: you can redistribute it and/or modify
	it under the terms of the GNU General Public License as published by
	the Free Software Foundation, either version 3 of the License, or
	(at your option) any later version.

	node-on-train is distributed in the hope that it will be useful, but
	WITHOUT ANY WARRANTY; without even the implied warranty of
	MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
	General Public License for more details.

	You should have received a copy of the GNU General Public License
	along with this program.  If not, see <http://www.gnu.org/licenses/>.

*/


/**
 * Node Modules
 */
var fs = require('fs');
var jroad = require('jroad');


/**
 * Load javascript functions
 */
require('./javascripts/jtrain.js');


/**
 * Global variables
 */
App = module.exports;
train_root_app = process.cwd(); // Application root path
train_html = "";


/**
 * Routes
 */
require('./train.action.controller.js');
require('./train.application.js');
Application = require(train_root_app + '/config/application.ls');
require('./train.routes.js');
require(train_root_app + '/config/routes.ls');


/**
 * Create Server
 */
require(train_root_app + '/app/controllers/application_controller.ls');

var response_assets = function (res, path, type) {
	fs.readFile(path, function(err, data) {
		res.writeHead(200, {'Content-Type': type});
		res.end(data);
	});
}

module.exports.newServer = function (req, res) {
	var req_parser = jroad.req_parser(req);
	if (req_parser.data_type == "view" && req_parser.controller == "root") {
		if (trainRoutes_root == "public")
			var path_index = train_root_app + '/public/index.html';
		response_assets(res, path_index, req_parser.content_type);
	} else if (req_parser.data_type == "asset") {
		var asset_path = jroad.asset_path(req_parser, train_root_app);
		response_assets(res, asset_path, req_parser.content_type);
	} else if (req_parser.data_type == "favicon") {
		var favicon_path = jroad.favicon(train_root_app);
		response_assets(res, favicon_path, req_parser.content_type);
	}
}