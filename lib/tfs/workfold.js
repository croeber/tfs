var format = require('../utils/format'),
    output = require('../utils/output'),
    tf = require('../utils/tf');

/**
 * Creates, modifies, or displays information about the mappings between your workspace folders and the folders on the server for Team Foundation version control.Required PermissionsTo use the workfold command, you must be the owner of the specified or implied workspace or have the global Administer workspaces permission set to Allow. For more information, see Team Foundation Server Permissions.
 *
 * @param  {Array}  itemspec File(s) or folder(s) to retrieve.
                             If null/undefined, equals CWD.
 * @param  {Object} options  Command options
 */
var workfold = function(itemspec, options, callback) {
  var params = [];

  if (options.workspace) {
    params.push('/workspace:'+options.workspace);
  }

  if (options.map) {
    params.push('/map');
  }

  if (options.unmap) {
    params.push('/unmap');
  }

  if (options.cloak) {
    params.push('/cloak');
  }

  if (options.decloak) {
    params.push('/decloak');
  }

  if (options.collection) {
    params.push('/collection:' + options.collection);
  }

  if (options.login) {
    params.push('/login');
  }

  if (options.verbose) {
    output.verbose('Command: get ' + params.join(' '));
  }

  if (Array.isArray(itemspec) && itemspec.length > 0) {
    itemspec.forEach(function (item) {
      params.push(item);
    });
  }

  var newCallback = function (responseError, response) {
    if (responseError) {
      callback(responseError, null);
      return;
    }
    response = output.response('Successful at Workfold Command.', response);
    callback(null, response);
    return;
  };

  return tf('workfold', params, newCallback, !!options.verbose);
};

module.exports = workfold;
