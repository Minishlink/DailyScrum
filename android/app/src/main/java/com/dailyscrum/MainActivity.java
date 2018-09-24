package com.dailyscrum;

import android.os.Bundle;
import com.facebook.react.ReactFragmentActivity;
import org.devio.rn.splashscreen.SplashScreen;

public class MainActivity extends ReactFragmentActivity {

    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */
    @Override
    protected String getMainComponentName() {
        return "DailyScrum";
    }

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        SplashScreen.show(this);
        super.onCreate(savedInstanceState);
    }
}
