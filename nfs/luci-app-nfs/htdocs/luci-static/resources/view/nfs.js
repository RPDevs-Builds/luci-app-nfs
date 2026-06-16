'use strict';
'require view';
'require fs';
'require form';
'require uci';
'require tools.widgets as widgets';

return view.extend({
	load: function() {
		return Promise.all([
			L.resolveDefault(fs.stat('/sbin/block'), null),
			L.resolveDefault(fs.stat('/etc/config/fstab'), null),
			L.resolveDefault(fs.exec('/usr/sbin/rpc.nfsd', ['--version']), {}),
		]);
	},
	render: function(stats) {
		var m, s, o;

		m = new form.Map('nfs', _('NFS Shares'), _('Kernel-level NFS file sharing configuration.'));

		s = m.section(form.TypedSection, 'nfs', _('General Settings'));
		s.anonymous = true;

		s.tab('general',  _('General Settings'));
		
		o = s.taboption('general', form.Flag, 'enabled', _('Enable NFS server'));
		o.rmempty = false;

		o = s.taboption('general', form.Flag, 'nfs_v3', _('Enable NFSv3'));
		o.default = '1';
		o.rmempty = false;

		o = s.taboption('general', form.Flag, 'nfs_v4', _('Enable NFSv4'));
		o.default = '1';
		o.rmempty = false;


		s = m.section(form.TableSection, 'share', _('Shared Directories'),
			_('List of directories to be shared via NFS.'));
		s.anonymous = true;
		s.addremove = true;

		o = s.option(form.Value, 'path', _('Path'), _('Absolute path to the shared directory.'));
		if (stats[0] && stats[1]) {
			o.titleref = L.url('admin', 'system', 'mounts');
		}
		o.datatype = 'directory';
		o.rmempty = false;

		o = s.option(form.Value, 'clients', _('Allowed Clients'), _('Client(s) allowed to access the share (e.g. *, 192.168.1.0/24).'));
		o.default = '*';
		o.rmempty = false;

		o = s.option(form.Value, 'options', _('NFS Options'), _('Export options (e.g. rw,sync,no_subtree_check).'));
		o.default = 'rw,sync,no_subtree_check';
		o.rmempty = false;

		return m.render();
	}
});
