Ext.define('App.view.vp.VpToolbar', {
    extend: 'Ext.toolbar.Toolbar',
    xtype: 'VpToolbar',
    id: 'VpToolbar',
    itemId: 'VpToolbar',
    margin: '2 2 2 2',
    requires: [

    ],
    constructor: function() {
        var me = this;

        var empbx = Ext.create('Ext.form.field.ComboBox',{
            width: 70,
            id: 'bxemp',
            itemId: 'bxemp',
            store: Ext.data.Store({
                fields: [{ name: 'idEmpresa' }, { name: 'apelido' }],
                proxy: {
                    type: 'ajax',
                    url: BASEURL + '/api/Vp/listarempresas',
                    reader: {
                        type: 'json',
                        root: 'data'
                    }
                }
            }),
            queryParam: 'codigo',
            queryMode: 'local',
            displayField: 'nome',
            valueField: 'nome',
            emptyText: 'Emp',
            forceSelection: true,
            disabled: true,
            margin: '1 1 1 1',
            listeners: {
               
            }
        });

        empbx.store.load(function(r){
            empbx.enable();
            empbx.select(USUARIO.empresa);
        });

        var dtinicio = Ext.create('Ext.form.field.Date',{
            name: 'dtinicio',
            id: 'dtinicio',
            fieldLabel: 'Data de',
            margin: '2 2 2 12',
            width: 180,
            labelWidth: 50,
            format: 'd/m/Y',
            altFormats: 'dmY',
            emptyText: '__/__/____'
        });

        var dtfim = Ext.create('Ext.form.field.Date',{
            name: 'dtfim',
            id: 'dtfim',
            fieldLabel: 'até',
            margin: '2 2 2 2',
            width: 132,
            labelWidth: 20,
            format: 'd/m/Y',
            altFormats: 'dmY',
            emptyText: '__/__/____'
        });

        var btncheck = Ext.create('Ext.button.Button',{
            
            iconCls: 'fa fa-check-double',
            id: 'btnConcluir',
            disabled: true,
            tooltip: 'Concluir',
            margin: '1 6 1 1',
            handler: function(form) {

                var myGrid = me.up('container').down('grid');
                            
                if(myGrid.getSelection() == 0){

                    Ext.Msg.alert('Alerta','Favor selecionar uma venda pedida.');
                    return null;
                    
                }

                var objWindow = Ext.getCmp('ConclusaoVpWindow');

                if(!objWindow){
                    objWindow = Ext.create('App.view.vp.ConclusaoVpWindow');
                    objWindow.show();
                }

                var storeGrid = objWindow.down('panel').down('grid').getStore();

                var exParams = {
                    emp : myGrid.getSelection()[0].data.idEmpresa,
                    idVendaPerdida : myGrid.getSelection()[0].data.idVendaPerdida,
                    idItem: myGrid.getSelection()[0].data.idItem,
                    idCategoria: myGrid.getSelection()[0].data.idCategoria
                };

                storeGrid.getProxy().setExtraParams(exParams);
                storeGrid.load();

                objWindow.down('panel').down('#winData').setValue(myGrid.getSelection()[0].data.vpDataLancamento);
                objWindow.down('panel').down('#winVendedor').setValue(myGrid.getSelection()[0].data.vpFuncionarioVenda);

                var cliente = myGrid.getSelection()[0].data.idCliente + ' ' + myGrid.getSelection()[0].data.nomeCliente;
                objWindow.down('panel').down('#winCliente').setValue(cliente);
                objWindow.down('panel').down('#comentarioSo').setValue(myGrid.getSelection()[0].data.vpComentario);

                objWindow.down('panel').down('#comentarioAp').setValue(myGrid.getSelection()[0].data.vpAprovacaoComentario);

            }
        });

        var btntrash = Ext.create('Ext.button.Button',{
            
            iconCls: 'fa fa-times',
            id: 'btnCancelar',
            disabled: true,
            tooltip: 'Cancelar',
            margin: '1 6 1 1',
            handler: function(form) {
            
                var myGrid = me.up('container').down('grid');
                
                if(myGrid.getSelection() == 0){

                    Ext.Msg.alert('Alerta','Favor selecionar uma venda pedida.');
                    return null;
                    
                }

                var objWindow = Ext.getCmp('CancelamentoVpWindow');

                if(!objWindow){
                    objWindow = Ext.create('App.view.vp.CancelamentoVpWindow');
                    objWindow.show();
                }

                var storeGrid = objWindow.down('panel').down('grid').getStore();

                var exParams = {
                    emp : myGrid.getSelection()[0].data.idEmpresa,
                    idVendaPerdida : myGrid.getSelection()[0].data.idVendaPerdida,
                    idItem: myGrid.getSelection()[0].data.idItem,
                    idCategoria: myGrid.getSelection()[0].data.idCategoria
                };

                storeGrid.getProxy().setExtraParams(exParams);
                storeGrid.load();

                objWindow.down('panel').down('#winDatacan').setValue(myGrid.getSelection()[0].data.vpDataLancamento);
                objWindow.down('panel').down('#winVendedorcan').setValue(myGrid.getSelection()[0].data.vpFuncionarioVenda);

                var cliente = myGrid.getSelection()[0].data.idCliente + ' ' + myGrid.getSelection()[0].data.nomeCliente;
                objWindow.down('panel').down('#winClientecan').setValue(cliente);
                objWindow.down('panel').down('#comentarioSocan').setValue(myGrid.getSelection()[0].data.vpComentario);

            }
        });

        var btnSearch = Ext.create('Ext.button.Button',{
            
            iconCls: 'fa fa-search',
            tooltip: 'Consultar',
            margin: '1 1 1 1',
            handler: function(form) {

                var myStore = me.up('panel').down('grid').getStore();

                var emp = '';

                if(me.down('#bxemp').getRawValue()){
                    var emp = me.down('#bxemp').selection.data.idEmpresa;
                }

                if(emp == ''){

                    Ext.Msg.alert('Alerta','Selecione Empresa.');

                    return null;
                    
                }

                btntrash.setDisabled(true);

                var dtinicio = me.down('#dtinicio').getRawValue();
                var dtfim = me.down('#dtfim').getRawValue();

                var params =  {
                    emp : emp,
                    dataInicio : dtinicio,
                    dataFim : dtfim
                };

                myStore.getProxy().setExtraParams(params);
                myStore.load();

                var gridLeste = me.up('panel').down('#PanelLeste').down('grid').getStore();

                gridLeste.getProxy().setExtraParams({emp: null});
                gridLeste.load();
            }
        });

        var btnClean = Ext.create('Ext.button.Button',{
            
            iconCls: 'fa fa-file',
            tooltip: 'Limpar',
            margin: '1 1 1 4',
            handler: function(form) {
            
                empbx.setSelection(null);
                dtinicio.setValue(null);
                dtfim.setValue(null);
            }
        });

        var btnPlus = Ext.create('Ext.button.Button',{
            
            iconCls: 'fa fa-check',
            id: 'btnComentario',
            tooltip: 'Aprovar',
            margin: '2 6 2 2',
            renderer: function (v) {
                return v;
            },
            handler: function(form) {

                var objWindow = Ext.getCmp('AprovacaoVpWindow');

                var myGrid = me.up('container').down('grid');
                
                if(myGrid.getSelection() == 0){

                    Ext.Msg.alert('Alerta','Favor selecionar uma venda pedida.');
                    return null;

                }

                if(!objWindow){
                    objWindow = Ext.create('App.view.vp.AprovacaoVpWindow');
                    objWindow.show();
                }
                
                var storeGrid = objWindow.down('panel').down('grid').getStore();

                var exParams = {
                    emp : myGrid.getSelection()[0].data.idEmpresa,
                    idVendaPerdida : myGrid.getSelection()[0].data.idVendaPerdida,
                    idItem: myGrid.getSelection()[0].data.idItem,
                    idCategoria: myGrid.getSelection()[0].data.idCategoria
                };

                storeGrid.getProxy().setExtraParams(exParams);
                storeGrid.load();

                objWindow.down('panel').down('#winData').setValue(myGrid.getSelection()[0].data.vpDataLancamento);
                objWindow.down('panel').down('#winVendedor').setValue(myGrid.getSelection()[0].data.vpFuncionarioVenda);

                var cliente = myGrid.getSelection()[0].data.idCliente + ' ' + myGrid.getSelection()[0].data.nomeCliente;
                objWindow.down('panel').down('#winCliente').setValue(cliente);
                objWindow.down('panel').down('#comentarioSo').setValue(myGrid.getSelection()[0].data.vpComentario);

            }
        });



        Ext.applyIf(me, {

            items: [
                empbx,
                dtinicio,
                dtfim,
                btnSearch,
                btnClean,
                '->',
                btnPlus,
                btncheck,
                btntrash
            ]

        });

        me.callParent(arguments);

    }

});
