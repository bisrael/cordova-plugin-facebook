package com.blakeisrael.cordova;

import org.apache.cordova.CordovaPlugin;
import org.apache.cordova.CordovaInterface;
import org.apache.cordova.CordovaWebView;

import com.facebook.FacebookSdk;
import com.facebook.appevents.AppEventsLogger;

public class CordovaFacebook extends CordovaPlugin {
    private String appId;

    @Override
    protected void pluginInitialize() {
        super.pluginInitialize();

        FacebookSdk.sdkInitialize(this.cordova.getActivity());

        this.appId = this.preferences.getString("FacebookAppId", null);
    }

    @Override
    public void onResume(boolean multitasking) {
        super.onResume(multitasking);

        AppEventsLogger.activateApp(this.cordova.getActivity(), this.appId);
    }

}