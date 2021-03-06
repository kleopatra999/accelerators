/* * *******************************************************************************************
 *  This file is part of the Oracle Service Cloud Accelerator Reference Integration set published
 *  by Oracle Service Cloud under the MIT license (MIT) included in the original distribution.
 *  Copyright (c) 2014, 2015, Oracle and/or its affiliates. All rights reserved.
 ***********************************************************************************************
 *  Accelerator Package: OSVC Contact Center + Siebel Case Management Accelerator
 *  link: http://www.oracle.com/technetwork/indexes/samplecode/accelerator-osvc-2525361.html
 *  OSvC release: 15.8 (August 2015)
 *  Siebel release: 8.1.1.15
 *  reference: 150520-000047
 *  date: Mon Nov 30 20:14:22 PST 2015

 *  revision: rnw-15-11-fixes-release-2
 *  SHA1: $Id: 236fee85cdf4ce5fd45bbb28e10c51199a09b715 $
 * *********************************************************************************************
 *  File: logic.js
 * ****************************************************************************************** */

RightNow.namespace('Custom.Widgets.SiebelServiceRequest');
Custom.Widgets.SiebelServiceRequest.SrFieldDisplay = RightNow.Widgets.extend({
    /**
     * Widget constructor.
     */
    constructor: function() {
        this._contentDiv = this.Y.one(this.baseSelector + '_Content');

        // Subscribe the 'SR Detail Returned' event fired by GetSrDetail widget
        RightNow.Event.subscribe('evt_SrDetailReturned', this._onSrDetailReturned, this);
    },
    /**
     * Handle the 'evt_SrDetailReturned' event. Get SR detail from eventObj and 
     * render the value of a specific field by its field name to view.ejs
     */
    _onSrDetailReturned: function(type, args) {
        // add placeholder
        var fieldValue = args[0].data.sr_detail_data[this.data.js.name];
        if(typeof fieldValue === 'undefined' || fieldValue === null){
            fieldValue = '&nbsp;';
        }
        this.renderView({
            label: this.data.js.label,
            value: fieldValue
        });
    },
    /**
     * Renders the `view.ejs` JavaScript template.
     */
    renderView: function(data) {
        var content = new EJS({text: this.getStatic().templates.view}).render({data: data});
        this._contentDiv.set('innerHTML', content);
    }
});