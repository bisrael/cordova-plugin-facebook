#import <FBSDKCoreKit/FBSDKCoreKit.h>
#import "CordovaFacebook.h"

@implementation CDVFacebook

- (void) pluginInitialize
{
    id FacebookAppId = [self.commandDelegate.settings objectForKey:[@"FacebookAppId" lowercaseString]];
    
    if (FacebookAppId != nil) {
        self.fbAppId = (NSString*) FacebookAppId;
    }
    
    NSNotificationCenter* defaultCenter = [NSNotificationCenter defaultCenter];
    
    [defaultCenter addObserver:self selector:@selector(onAppDidBecomeActive:) name:UIApplicationDidBecomeActiveNotification object:nil];
    [defaultCenter addObserver:self selector:@selector(onAppDidFinishLaunching:) name:UIApplicationDidFinishLaunchingNotification object:nil];
}



- (void) onAppDidFinishLaunching: (NSNotification*) notification
{
    UIApplication* app = (UIApplication*)[notification object];
    NSDictionary* userInfo = [notification userInfo];
    if(userInfo != nil) {
        // The app was launched via a URL or shared app resource.
        NSURL* url = [userInfo objectForKey: UIApplicationLaunchOptionsURLKey];
        NSString* fromApp = [userInfo objectForKey: UIApplicationLaunchOptionsSourceApplicationKey];
        id annotation = [userInfo objectForKey: UIApplicationLaunchOptionsAnnotationKey];
        
        [self setFacebookApplication:app
                             withURL:url
                   sourceApplication:fromApp
                          annotation:annotation];
    } else {
        [self setFacebookApplication:app withLaunchOptions:userInfo];
    }
}

- (void) onAppDidBecomeActive: (NSNotification*) notification
{
    [self setFacebookActive];
}

- (void) setFacebookApplication:(UIApplication*)application withLaunchOptions: (NSDictionary*)launchOptions
{
    [[FBSDKApplicationDelegate sharedInstance] application:application
                             didFinishLaunchingWithOptions:launchOptions];
}


- (void) setFacebookApplication:(UIApplication*)application withURL: (NSURL *)url sourceApplication:(NSString *)sourceApplication annotation:(id)annotation
{
    [[FBSDKApplicationDelegate sharedInstance] application:application
                                                   openURL:url
                                         sourceApplication:sourceApplication
                                                annotation:annotation];
}

- (void) setFacebookActive
{
    if(self.fbAppId != nil) {
        [FBSDKSettings setAppID:self.fbAppId];
    }
    [FBSDKAppEvents activateApp];
}

@end