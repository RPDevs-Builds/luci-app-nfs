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

		m = new form.Map('nfs', _('NFS Shares'), _('Kernel-level NFS file sharing configuration. Allows sharing directories over the network to Linux/Unix clients.'));

		s = m.section(form.TypedSection, 'nfs', _('General Settings'));
		s.anonymous = true;

		s.tab('general',  _('General Settings'));
		s.tab('advanced', _('Advanced Settings'));
		
		o = s.taboption('general', form.Flag, 'enabled', _('Enable NFS server'), _('Global switch to enable or disable the NFS server service.'));
		o.rmempty = false;

		o = s.taboption('general', form.Flag, 'nfs_v3', _('Enable NFSv3'), _('Enable support for NFS version 3. Recommended for compatibility with older clients.'));
		o.default = '1';
		o.rmempty = false;

		o = s.taboption('general', form.Flag, 'nfs_v4', _('Enable NFSv4'), _('Enable support for NFS version 4. Provides better security and performance on modern networks.'));
		o.default = '1';
		o.rmempty = false;

		o = s.taboption('advanced', form.Value, 'threads', _('Number of threads'), _('The number of worker threads to start. Higher values can improve performance under heavy load. Default is 16.'));
		o.datatype = 'uinteger';
		o.default = '16';
		o.placeholder = '16';

		o = s.taboption('advanced', form.Value, 'port', _('Port'), _('The port number the NFS server will listen on. Default is 2049.'));
		o.datatype = 'port';
		o.default = '2049';
		o.placeholder = '2049';

		o = s.taboption('advanced', form.Flag, 'tcp', _('Enable TCP'), _('Allow clients to connect using the TCP protocol. Recommended for reliability.'));
		o.default = '1';
		o.rmempty = false;

		o = s.taboption('advanced', form.Flag, 'udp', _('Enable UDP'), _('Allow clients to connect using the UDP protocol. Use only if required by legacy clients.'));
		o.default = '0';
		o.rmempty = false;


		s = m.section(form.TableSection, 'share', _('Shared Directories'),
			_('List of directories to be shared via NFS. Each entry defines a path and the clients allowed to access it.'));
		s.anonymous = true;
		s.addremove = true;

		o = s.option(form.Value, 'path', _('Path'), _('The absolute path to the directory on this system that you wish to share.'));
		if (stats[0] && stats[1]) {
			o.titleref = L.url('admin', 'system', 'mounts');
		}
		o.datatype = 'directory';
		o.rmempty = false;

		o = s.option(form.Value, 'clients', _('Allowed Clients'), _('Specify which clients can access this share. Can be a single IP, a subnet (e.g., 192.168.1.0/24), or "*" for all.'));
		o.default = '*';
		o.rmempty = false;

		o = s.option(form.Value, 'options', _('NFS Options'), _('Comma-separated list of export options. Common options: rw (read-write), sync (immediate writes), no_subtree_check (improve performance), no_root_squash (trust root user).'));
		o.default = 'rw,sync,no_subtree_check';
		o.rmempty = false;

		return m.render();
	}
});
