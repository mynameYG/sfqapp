import Vue from 'vue';

function hasPermission(module, permission){
	let resource = Vue.prototype.$store.state.resources[module];
	return resource && resource.permissions.includes(permission);
}

export default hasPermission