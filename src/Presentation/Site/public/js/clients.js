Vue.use(VueMask.VueMaskPlugin);
function format(value, pattern) {
	var i = 0,
		v = value.toString();
	return pattern.replace(/#/g, _ => v[i++]);
}

function validCpf(strCPF) {
	var Soma;
	var Resto;
	Soma = 0;
	if (strCPF == "00000000000") return false;

	for (var i = 1; i <= 9; i++) Soma = Soma + parseInt(strCPF.substring(i - 1, i)) * (11 - i);
	Resto = (Soma * 10) % 11;

	if ((Resto == 10) || (Resto == 11)) Resto = 0;
	if (Resto != parseInt(strCPF.substring(9, 10))) return false;

	Soma = 0;
	for (i = 1; i <= 10; i++) Soma = Soma + parseInt(strCPF.substring(i - 1, i)) * (12 - i);
	Resto = (Soma * 10) % 11;

	if ((Resto == 10) || (Resto == 11)) Resto = 0;
	if (Resto != parseInt(strCPF.substring(10, 11))) return false;
	return true;
}

var app = new Vue({
	el: '#app',
	data: function () {
		return {
			name: '',
			cpf: '',
			birthDay: '',
			fields: [
				{ label: 'Id', key: 'id' },
				{ label: 'Nome', key: 'name' },
				{ label: 'CPF', key: 'cpf', formatter: (value, key, item) => { return format(value, '###.###.###-##') } },
				{
					label: 'Aniversário',
					key: 'birthDay',
					formatter: (value, key, item) => { return moment(value).format('DD/MM/YYYY') }
				},
				{ label: '...', key: 'actions' },
			],
			data: [], // no data
			total: 0,
			currentPage: 0,
			perPage: 10,
			filter: { name: '', cpf: '', birthDay: '' },
			editItem: {
				id: null,
				birthDay: '',
				cpf: '',
				name: '',
				rg: '',
				PhoneNumbers: []
			}
		}
	},
	computed: {
		validCpf: function () {
			var obj = this.editItem.cpf;
			return validCpf(obj.replace('.', '').replace('.', '').replace('-', '')) ? 'is-valid' : 'is-invalid';

		},
		checkBirthDay: function() {
			return (moment(Date.now()).diff(moment(this.editItem.birthDay), 'years') >= 18 ? 'is-valid' : 'is-invalid');
		}
	},
	watch: {
		name: function(val) {
			this.filter = { ...this.filter, name: val };
		},
		cpf: function (val) {
			this.filter = { ...this.filter, cpf: val.replace('.','').replace('.','').replace('-','') };
		},
		birthDay: function (val) {
			this.filter = { ...this.filter, birthDay: val };
		}
	},
	methods: {
		applyFilter() {
			//this.data.push({ id: 1, name: 'teste' });
			//alert(validCpf(this.cpf.replace('.', '').replace('.', '').replace('-', '')));
		},
		provider(ctx, callback) {
			if ((ctx.currentPage - 1) * ctx.perPage >= 0 )
				this.$http.get('clients/list', { params: { offset: (ctx.currentPage - 1) * ctx.perPage, limit: ctx.perPage, name: ctx.filter.name, cpf: ctx.filter.cpf, birthDay: ctx.filter.birthDay } })
					.then(result => {
						this.total = result.body.count;
						this.data = result.body.rows;
						callback(result.body.rows);
					})
					.catch(error => {
						callback([]);
					});
		},
		del(item, index, button) {
			swal({
					title: "Atenção",
					text: 'Deseja realmente remover este registro?',
					icon: "warning",
					buttons: true,
					dangerMode: true,
				})
				.then((willDelete) => {
					if (willDelete) {
						this.$http.delete(`clients/${item.id}`)
							.then(result => {
								this.$refs.table.refresh();
								swal("Registro removido com sucesso!", {
									icon: "success",
								});
							})
							.catch(error => {
								this.$refs.table.refresh();
								swal("Erro ao remover registro.", {
									icon: "error",
								});
							});
						
					}
				});
		},
		edit(item, index, button) {
			this.editItem = { ...item };
			for (var i in this.editItem.PhoneNumbers) {
				this.editItem.PhoneNumbers[i].id = null;
			}
			this.editItem.birthDay = moment(this.editItem.birthDay).format('YYYY-MM-DD');
			this.$root.$emit('bv::show::modal', 'modalEdit', button);
		},
		novo(button) {
			this.$root.$emit('bv::show::modal', 'modalEdit', button);
		},
		resetModal() {
			this.editItem = {
				id: null,
				birthDay: '',
				cpf: '',
				name: '',
				rg: '',
				PhoneNumbers: []
			}
		},
		addNumber() {
			this.editItem.PhoneNumbers.push({ number: '' });
		},
		removeNumber(index) {
			this.editItem.PhoneNumbers.splice(index, 1);
		},
		saveItem(bvEvt) {
			bvEvt.preventDefault();
			var frm = document.body.querySelector('#frmEdit');
			if (frm.checkValidity()) {
				if (this.editItem.id && this.editItem.id > 0) {
					var obj = this.editItem;
					obj.cpf = obj.cpf.replace('.', '').replace('.', '').replace('-', '');
					this.$http.put('clients', obj)
						.then(result => {
							this.$refs.table.refresh();
							this.$refs.modalEdit.hide();
							swal("Registro salvo com sucesso!",
								{
									icon: "success",
								});
						})
						.catch(error => {
							swal("Erro ao salvar registro.",
								{
									icon: "error",
								});
						});
				} else {
					var obj = this.editItem;
					obj.cpf = obj.cpf.replace('.', '').replace('.', '').replace('-', '');
					this.$http.post('clients', obj)
						.then(result => {
							this.$refs.table.refresh();
							this.$refs.modalEdit.hide();
							swal("Registro salvo com sucesso!", {
								icon: "success",
							});
						})
						.catch(error => {
							swal("Erro ao salvar registro.", {
								icon: "error",
							});
						});
				}
			}

		}
	},
	mounted: function() {
		//window.addEventListener('load', function () {
		//	// Fetch all the forms we want to apply custom Bootstrap validation styles to
		//	var forms = document.getElementsByClassName('needs-validation');
		//	// Loop over them and prevent submission
		//	var validation = Array.prototype.filter.call(forms, function (form) {
		//		form.addEventListener('submit', function (event) {
		//			if (form.checkValidity() === false) {
		//				event.preventDefault();
		//				event.stopPropagation();
		//			}
		//			form.classList.add('was-validated');
		//		}, false);
		//	});
		//}, false);
	}
});
