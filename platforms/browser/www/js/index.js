/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};

if(localStorage.getItem('data') !== null){
    $("#input").hide();

    var getData = localStorage.getItem('data');
    parsedData = JSON.parse(getData);
    var act = parsedData.activity;
    var current = parsedData.current;
    var next = Math.round(parsedData.current*1.01*100)/100;
    var start = parsedData.start;
    var increase_calc = current-start;
    var increase = Math.round(increase_calc/start*100);
    $("#output").html("<p>Activity: "+act+"</p><p>Current: "+current+"</p><p>Next: "+next+"</p><p>Skill increase: "+increase+"%</p>");
    //console.log(parsedData.start);
}else{
    $("#update").hide();
}


$("#save").click(function(){
    var value = $("#name").val();
    var value2 = $("#number").val();
    if(value == "" || value2 == ""){
        $("#error").html("<h3 id='err'> Please fill all fields</h3>");
    }else{
    var activity = {"activity": value, "start":value2, "current":value2};
    window.localStorage.setItem("data", JSON.stringify(activity));
    window.location.reload(true);
    }
});

$("#update").click(function(){
    var activity = {"activity": act, "start":start, "current":next};
    console.log(JSON.stringify(activity));
    window.localStorage.setItem("data", JSON.stringify(activity));
    window.location.reload(true);
});

$("#reset").click(function(){
    localStorage.removeItem('data');
    window.location.reload(true);
});

