Ext.define('App.view.vp.CancelamentoVpWindow', {
    extend: 'Ext.window.Window',
    xtype: 'CancelamentoVpWindow',
    id: 'CancelamentoVpWindow',
    height: Ext.getBody().getHeight() * 0.7,
    width: Ext.getBody().getWidth() * 0.7,
    title: 'Cancelamento de Comentário de Venda Perdida',
    requires:[

    ],
    layout: 'fit',
    constructor: function() {
        var me = this;

        var btnCanc = Ext.create('Ext.form.field.TextArea', {

            fieldLabel: '<b>Comentário de Cancelamento</b>',
            maxRows: 4,
            labelAlign: 'top',
            name: 'comentarioCanc',
            maxLength: 100,
            anchor: '98%',
            margin: '1 1 1 1'
        });

        var btnCancelar = Ext.create('Ext.button.Button',{
            
            text: 'Confirmar',
            tooltip: 'Confirmar',
            margin: '1 6 1 1',
            handler: function(form) {

                var urlAction = '/api/vp/Cancelar';

                var dataVp = me.down('grid').getStore().getData().items[0].data;

                var param = {
                    emp: dataVp.idEmpresa,
                    idVendaPerdida: dataVp.idVendaPerdida,
                    comentarioCanc: btnCanc.getValue()
                };

                Ext.Ajax.request({
                    url : BASEURL + urlAction,
                    method: 'POST',
                    params: param,
                    success: function (response) {

                        var result = Ext.decode(response.responseText);
                        if(result.success){

                            var gridLeste = Ext.getCmp('gridLeste');

                            gridLeste.getStore().getProxy().setExtraParams(param);
                            gridLeste.getStore().load();

                            // Ext.Msg.alert('info', 'Cancelamento de Comentário Registrado!');
                            me.close();

                            var gridItens = Ext.getCmp('ItensGridPanel');
                            gridItens.getStore().reload();

                        }else{
                            Ext.Msg.alert('info', result.message);
                        }

                    }
                });

            }
        });

        var myStore = Ext.create('Ext.data.Store', {
            model: Ext.create('Ext.data.Model', {
                    fields:[{name:'idEmpresa',mapping:'idEmpresa'},
                            {name:'idCliente',mapping:'idCliente'},
                            {name:'nomeCliente',mapping:'nomeCliente'},
                            {name:'codItem',mapping:'codItem'},
                            {name:'descItem',mapping:'descItem'},
                            {name:'marca',mapping:'marca'},
                            {name:'curva',mapping:'curva'},
                            {name:'vpDataLancamento', type: 'date', dateFormat: 'd/m/Y H:i:s' },
                            {name:'vpQtde',mapping:'vpQtde'}
                            ]
            }),
            proxy: {
                type: 'ajax',
                url : BASEURL + '/api/vp/listaritenscategorias',
                timeout: 240000,
                reader: {
                    type: 'json',
                    root: 'data'
                }
            },
            autoLoad : false
        });

        Ext.applyIf(me, {
            
            items:[
                {
                    xtype:'container',
                    layout: 'border',
                    margin: '0 0 0 0',
                    items:[
                        {
                            xtype: 'form',
                            region: 'center',
                            border: false,
                            // padding: 5,
                            bodyPadding: '5 5 5 5',
                            items: [
                                {
                                    xtype: 'form',
                                    layout: 'hbox',
                                    border: false,
                                    items: [
                                        {
                                            xtype: 'fieldset',
                                            title: '<b>Data</b>',
                                            defaultType: 'textfield',
                                            width: '14%',
                                            margin: '0 6 6 0',
                                            defaults: {
                                                anchor: '100%'
                                            },
                                            items: [
                                                {
                                                    xtype: 'displayfield',
                                                    id: 'winDatacan'
                                                }
                                            ]
                                        },
                                        {
                                            xtype: 'fieldset',
                                            title: '<b>Vendedor</b>',
                                            defaultType: 'textfield',
                                            width: '32%',
                                            margin: '0 6 6 0',
                                            defaults: {
                                                anchor: '100%'
                                            },
                                            items: [
                                                {
                                                    xtype: 'displayfield',
                                                    id: 'winVendedorcan'
                                                }
                                            ]
                                        },
                                        {
                                            xtype: 'fieldset',
                                            title: '<b>Cliente</b>',
                                            defaultType: 'textfield',
                                            flex: 1,
                                            // width: '44%',
                                            margin: '0 0 6 0',
                                            defaults: {
                                                anchor: '100%'
                                            },
                                            items: [
                                                {
                                                    xtype: 'displayfield',
                                                    id: 'winClientecan'
                                                }
                                            ]
                                        }
                                    ]
                                },
                                {
                                    xtype: 'grid',
                                    store: myStore,
                                    columns:[
                                        {
                                            text: 'Emp',
                                            dataIndex: 'emp',
                                            width: 52
                                        },
                                        {
                                            text: 'Cod. Cli.',
                                            dataIndex: 'idCliente',
                                            width: 100,
                                            hidden: true
                                        },
                                        {
                                            text: 'Cliente',
                                            dataIndex: 'nomeCliente',
                                            flex: 1,
                                            minWidth: 100,
                                            hidden: true
                                        },
                                        {
                                            text: 'Código',
                                            dataIndex: 'codItem',
                                            width: 100,
                                            hidden: false
                                        },
                                        {
                                            text: 'Descrição',
                                            dataIndex: 'descItem',
                                            flex: 1,
                                            minWidth: 100
                                        },
                                        {
                                            text: 'Marca',
                                            dataIndex: 'marca',
                                            width: 120
                                        },
                                        {
                                            text: 'Curva',
                                            dataIndex: 'curva',
                                            width: 60
                                        },
                                        {
                                            text: 'Quantidade',
                                            dataIndex: 'vpQtde',
                                            width: 100
                                        },
                                        {
                                            text: 'Estoque',
                                            dataIndex: 'vpEstoque',
                                            width: 80
                                        },
                                        {
                                            text: 'Data',
                                            dataIndex: 'vpDataLancamento',
                                            width: 100,
                                            hidden: true
                                        }
                                    ]
                                },
                                {
                                    xtype: 'displayfield',
                                    fieldLabel: '<b>Comentário de Solicitação</b>',
                                    scrollable : true,
                                    labelAlign: 'top',
                                    id: 'comentarioSocan',
                                    anchor: '98%',
                                    margin: '20 1 1 1'
                                },
                                btnCanc
                            ]
                        },
                        {
                            xtype: 'toolbar',
                            region: 'south',
                            margin: '0 0 0 0',
                            border: false,
                            items: [
                                '->',
                                btnCancelar
                            ]
                        }
                    ]
                }
            ]

        });

        me.callParent(arguments);

    }

});
