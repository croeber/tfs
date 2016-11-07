var format = require('../utils/format'),
    output = require('../utils/output'),
    tf = require('../utils/tf');

/**
 * Lets you create, delete, view, or modify properties and mappings associated with a workspace.Required PermissionsTo modify or delete an existing workspace, you must be the owner or have the global Administer workspaces permission set to Allow. To create a workspace, you must have the global Create a workspace permission set to Allow. To create workspaces for other users, you must have the Administer workspaces permission set to Allow. For more information, see Team Foundation Server Permissions.
 *
 * @param  {Array}  itemspec File(s) or folder(s) to retrieve.
                             If null/undefined, equals CWD.
 * @param  {Object} options  Command options
 */
var workspace = function(itemspec, options, callback) {
  var params = [];

  if (options.new) {
    params.push('/new');
  }

  if (options.template) {
    params.push('/template');
  }

  if (options.delete) {
    params.push('/delete');
  }

  if (options.computer) {
    params.push('/computer');
  }

  if (options.comment) {
    params.push('/comment:' + options.comment);
  }

  if (options.newname) {
    params.push('/newname');
  }

  if (options.noprompt) {
    params.push('/noprompt');
  }

  if (options.collection) {
    params.push('/collection:' + options.collection);
  }

  if (options.permission) {
    params.push('/permission');
  }

  if (options.login) {
    params.push('/login');
  }

  if (options.newowner) {
    params.push('/newowner');
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
    response = output.response('Successful at Workspace Command.', response);
    callback(null, response);
    return;
  };

  return tf('workspace', params, newCallback, !!options.verbose);
};

module.exports = workspace;
