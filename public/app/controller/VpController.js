Ext.define('App.controller.VpController', {
    extend: 'Ext.app.Controller',

    requires: [
        'App.view.vp.Main',
        'App.view.vp.VpToolbar',
        'App.view.vp.ItensGridPanel',
        'App.view.vp.PanelLeste',
        'App.view.vp.AprovacaoVpWindow',
        'App.view.vp.AtendimentoVpWindow',
        'App.view.vp.ConclusaoVpWindow',
        'App.view.vp.CancelamentoVpWindow'
    ],

    control: {

    },

    init: function() {
        var me = this;

    }
    
});
