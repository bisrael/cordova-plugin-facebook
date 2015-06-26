#import <Foundation/Foundation.h>

#import <Cordova/CDVPlugin.h>
#import <Cordova/CDVInvokedUrlCommand.h>

@interface CDVFacebook : CDVPlugin {

}

@property (nonatomic) FBSDKLoginManager *fbLogin;
@property (nonatomic, copy) NSString *fbAppId;
@property (nonatomic, weak) UIApplication *app;

+ (NSDictionary*) arrayAsDictionary:(NSArray*) array;

- (void) setFacebookActive;
- (void) event: (CDVInvokedUrlCommand*) command;
- (void) purchase: (CDVInvokedUrlCommand*) command;
- (void) login: (CDVInvokedUrlCommand*) command;
- (void) logout: (CDVInvokedUrlCommand*) command;
- (void) profile: (CDVInvokedUrlCommand*) command;
- (void) onAppDidBecomeActive: (NSNotification*) notification;
- (void) onAppDidFinishLaunching: (NSNotification*) notification;
- (void) onHandleOpenURL: (NSNotification*) notification;
- (void) setFacebookApplication:(UIApplication*)application withLaunchOptions: (NSDictionary*)launchOptions;
- (void) setFacebookApplication:(UIApplication*)application withURL: (NSURL *)url sourceApplication:(NSString *)sourceApplication annotation:(id)annotation;

@end