var cpf = require('cpf');
var ClientRepositoryMG = require('../../Infra/Data/Repositories/clientRepository')('developmentmg');
var ClientRepositorySP = require('../../Infra/Data/Repositories/clientRepository')('developmentsp');
var moment = require('moment');
describe('Client ', function () {
	it('Create in developmentMG', function (done) {
		ClientRepositoryMG.Save(
			{
				cpf: cpf.generate(false),
				name: 'welberty',
				birthDay: '04-26-1989',
				rg: 'mg15823127',
				PhoneNumbers: [{ number: '123' }, { number: '456' }]
			},
			(err, result) => {
				if (err)
					done(err);
				else
					done();
			});
	});
	it('Test Empty RG developmentMG', function (done) {
		ClientRepositoryMG.Save(
			{
				cpf: cpf.generate(false),
				name: 'RG em branco',
				birthDay: '04-26-1989',
				PhoneNumbers: [{ number: '123' }, { number: '456' }]
			},
			(err, result) => {
				if (err)
					done();
				else
					done(Error('Inserted with empty RG!'));
			});
	});
	it('GetById in developmentMG', function (done) {
		ClientRepositoryMG.Save(
			{
				cpf: cpf.generate(false),
				name: 'welberty 2',
				birthDay: '04-26-1989',
				rg: 'mg15823127',
				PhoneNumbers: [{ number: '123' }, { number: '456' }]
			},
			(err, result) => {
				if (err)
					done(err);
				else {

					ClientRepositoryMG.GetById(result.id, (err, _result) => {
						if (err)
							done(err);
						else
							done();
					});
				}
			});
	});
	it('Update in developmentMG', function (done) {
		ClientRepositoryMG.Save(
			{
				cpf: cpf.generate(false),
				name: 'welberty 2',
				birthDay: '04-26-1989',
				rg: 'mg15823127',
				PhoneNumbers: [{ number: '123' }, { number: '456' }]
			},
			(err, result) => {
				if (err)
					done(err);
				else {
					
					ClientRepositoryMG.Update({ id: result.id, name: 'novo nome' }, (err, _result) => {
						if (err)
							done(err);
						else
							done();
					});
				}
			});
	});
	it('Delete in developmentMG', function (done) {
		ClientRepositoryMG.Save(
			{
				cpf: cpf.generate(false),
				name: 'Client delete',
				birthDay: '04-26-1989',
				rg: 'mg15823127',
				PhoneNumbers: [{ number: '123' }, { number: '456' }]
			},
			(err, result) => {
				if (err)
					done(err);
				else {

					ClientRepositoryMG.Delete(result.id, (err, _result) => {
						if (err)
							done(err);
						else
							done();
					});
				}
			});
	});

	it('Filter in developmentMG', function (done) {
		ClientRepositoryMG.Filter('welbe', '09084588606', '1989-04-26', 1, 10, 
			(err, result) => {
				if (err)
					done(err);
				else {

					ClientRepositoryMG.Delete(result.id, (err, _result) => {
						if (err)
							done(err);
						else
							done();
					});
				}
			});
	});

	it('Create in developmentSP', function (done) {
		ClientRepositorySP.Save({
			cpf: cpf.generate(false),
			name: 'welberty',
			birthDay: '04-01-2000',
			rg: 'mg15823127',
			PhoneNumbers: [{ number: '123' }, { number: '456' }]
		}, (err, result) => {
			if (err)
				done(err);
			else
				done();
		});

	});
	it('Test CPF Invalid developmentSP', function (done) {
		ClientRepositorySP.Save({
			cpf: cpf.generate(false, true),
			name: 'welberty',
			birthDay: '04-01-2000',
			rg: 'mg15823127',
			PhoneNumbers: [{ number: '123' }, { number: '456' }]
		}, (err, result) => {
			if (err)
				done();
			else
				done(Error('Inserted with invalid cpf!'));
		});

	});
	it('GetById in developmentSP', function (done) {
		ClientRepositorySP.Save(
			{
				cpf: cpf.generate(false),
				name: 'welberty 2',
				birthDay: '04-26-1989',
				rg: 'mg15823127',
				PhoneNumbers: [{ number: '123' }, { number: '456' }]
			},
			(err, result) => {
				if (err)
					done(err);
				else {

					ClientRepositorySP.GetById(result.id, (err, _result) => {
						if (err)
							done(err);
						else
							done();
					});
				}
			});
	});
	it('Update in developmentSP', function (done) {
		ClientRepositorySP.Save(
			{
				cpf: cpf.generate(false),
				name: 'welberty 2',
				birthDay: '04-26-1989',
				rg: 'mg15823127',
				PhoneNumbers: [{ number: '123' }, { number: '456' }]
			},
			(err, result) => {
				if (err)
					done(err);
				else {

					ClientRepositorySP.Update({ id: result.id, name: 'novo nome' }, (err, _result) => {
						if (err)
							done(err);
						else
							done();
					});
				}
			});
	});
	it('Delete in developmentSP', function (done) {
		ClientRepositorySP.Save(
			{
				cpf: cpf.generate(false),
				name: 'Client delete',
				birthDay: '04-26-1989',
				rg: 'mg15823127',
				PhoneNumbers: [{ number: '123' }, { number: '456' }]
			},
			(err, result) => {
				if (err)
					done(err);
				else {

					ClientRepositorySP.Delete(result.id, (err, _result) => {
						if (err)
							done(err);
						else
							done();
					});
				}
			});
	});
});