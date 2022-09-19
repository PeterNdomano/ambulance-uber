package com.casmedia.calipa;

import androidx.appcompat.app.AppCompatActivity;

import android.graphics.Bitmap;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.view.WindowManager;
import android.widget.LinearLayout;
import android.widget.Toast;

import com.androidnetworking.AndroidNetworking;

import im.delight.android.webview.AdvancedWebView;

public class MainActivity extends AppCompatActivity {
    public AdvancedWebView webView;
    public LinearLayout loader;
    public LinearLayout errorPage;
    public Commons commons = new Commons();

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        AndroidNetworking.initialize(getApplicationContext());
        getWindow().setFlags(WindowManager.LayoutParams.FLAG_SECURE, WindowManager.LayoutParams.FLAG_SECURE);
        setContentView(R.layout.activity_main);
        loader = (LinearLayout) findViewById(R.id.loader);
        errorPage = (LinearLayout) findViewById(R.id.error_page);
        webView = (AdvancedWebView) findViewById(R.id.webview);
        webView.loadUrl(commons.BASE_URL);
        webView.setCookiesEnabled(true);
        webView.setMixedContentAllowed(true);


        webView.setListener(this, new AdvancedWebView.Listener() {
            @Override
            public void onPageStarted(String url, Bitmap favicon) {
                loader.setVisibility(View.VISIBLE);
                String beemLink = "checkout.beem.africa";
                if(url.indexOf(beemLink) >= 0) {
                    //launch hover based payment system
                }
            }

            @Override
            public void onPageFinished(String url) {
                loader.setVisibility(View.GONE);
            }

            @Override
            public void onPageError(int errorCode, String description, String failingUrl) {
                errorPage.setVisibility(View.VISIBLE);
                Log.e("Error code:", String.valueOf(errorCode));
                Log.e("Error descr:", description);
            }

            @Override
            public void onDownloadRequested(String url, String suggestedFilename, String mimeType, long contentLength, String contentDisposition, String userAgent) {

            }

            @Override
            public void onExternalPageRequest(String url) {
                //Toast.makeText(MainActivity.this, url, Toast.LENGTH_SHORT).show();
            }
        });

    }

    @Override
    public void onBackPressed() {
        if (!webView.onBackPressed()) { return; }
        // ...
        super.onBackPressed();
        super.onBackPressed();
    }

    public void retry(View v){
        recreate();
    }
}