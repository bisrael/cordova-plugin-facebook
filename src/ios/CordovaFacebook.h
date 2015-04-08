#import <Foundation/Foundation.h>

#import <Cordova/CDVPlugin.h>
#import <Cordova/CDVInvokedUrlCommand.h>

@interface CDVFacebook : CDVPlugin {

}

@property (nonatomic, copy) NSString *fbAppId;

+ (NSDictionary*) arrayAsDictionary:(NSArray*) array;

- (void) setFacebookActive;
- (void) event: (CDVInvokedUrlCommand*) command;
- (void) purchase: (CDVInvokedUrlCommand*) command;
- (void) onAppDidBecomeActive: (NSNotification*) notification;
- (void) onAppDidFinishLaunching: (NSNotification*) notification;
- (void) setFacebookApplication:(UIApplication*)application withLaunchOptions: (NSDictionary*)launchOptions;
- (void) setFacebookApplication:(UIApplication*)application withURL: (NSURL *)url sourceApplication:(NSString *)sourceApplication annotation:(id)annotation;

@end