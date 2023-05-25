

describe('Starting Android App Testing with JS', () => {
    it('Start Emulator',async () => {

        await driver.pause(7000);


        // $ - Single Element | findElement
        // $$ - multi elements | findElements
        // ~ - Idenfity the element with Accessibility ID
        const appbtn = await $('~App') ;
        await appbtn.click() ;
        const actBarbtn = await $('~Action Bar') ;
        await expect(actBarbtn).toBeExisting() ;
        // await driver.pause(8000);
    });


    it('wifi settings', async() => {
        
        await driver.pause(5000);
        await $("~Preference").click(); //accessbility id
        await $("~3. Preference dependencies").click(); //accessbility id
        // identify element based on the class name
        await $("android.widget.CheckBox").click(); //class
        await $("//android.widget.TextView[@text='WiFi settings']").click(); //xptah with class name and text
        await $('//*[@resource-id="android:id/edit"]').addValue("Hello");  //xpath //type text to input Box
             driver.hideKeyboard();
        await $("//android.widget.Button[@text='CANCEL']").click(); //xpath with class and text
        console.log("Clicked on Cancle Button")
        await driver.pause(2000);
        driver.back(); // go back
        await driver.pause(2000);

    });

    it('notification',async () => {

         // open notification shelter
         await driver.openNotifications() ;
         await $('~Open quick settings.').click() ;
         await $('~Battery Saver').click() ;
         await driver.pause(2000) ;

         await driver.toggleAirplaneMode() ; 
         await driver.pause(5000) ;
         await driver.toggleAirplaneMode() ; 

         await driver.back() ;
         await driver.back() ;
    });

    it('Alerts', async() => {
        await $('~App').click() ;
        await $('~Alert Dialogs').click() ;
        await $('~OK Cancel dialog with a message').click() ;
        const alertmsg = await driver.getAlertText() ;
        console.log(alertmsg) ;
        await driver.acceptAlert() ;
        // cancel
        // driver.dismissAlert() ;
    });

    it('long press', async() => {
        await $('~Views').click() ;
        await $('~Expandable Lists').click() ;
        await $('~1. Custom Adapter').click() ;
        // await $('~1. Custom Adapter').click() ;
       const pplNames =  await $('//*[@text="People Names"]') ;
       await pplNames.touchAction('longPress') ;
       await driver.pause(5000) ;
       await $('//*[@text="Sample action"]').click() ;
    });


    it('drag and drop', async() => {
        await $('~Views').click() ;
        await $('~Drag and Drop').click() ;
        const ele =  await $('//*[@resource-id="io.appium.android.apis:id/drag_dot_2"]')  ;
        const trg =  await $('//*[@resource-id="io.appium.android.apis:id/drag_dot_1"]')  ;
        await trg.touchAction(['press' , {'action': 'moveTo' , element:ele }, 'release']) ;
    });


    it('Scroll', async() => {
        await $('~Views').click() ;
        await $( 'android=new UiScrollable(new UiSelector().scrollable(true)).scrollIntoView(text(\"Tabs\"))').click() ;
        // await $( 'android=new UiScrollable(new UiSelector().scrollable(true)).scrollToEnd(1,5))').click() ;  // BUG
    });

    
    it('Scroll to end', async() => {
        await $('~Views').click() ;
        // await $( 'android=new UiScrollable(new UiSelector().scrollable(true)).scrollToEnd(1,5)') ;  // BUG
        await $('~Gallery').click() ;
        await $('~1. Photos').click() ;
        await driver.pause(7000) ;
        await $( 'android=new UiScrollable(new UiSelector().scrollable(true)).setAsHorizontalList().scrollForward()') ;
        await driver.pause(7000) ;
        // if you want to scroll to text then give text in scrollBackward(text(\'any\'))
        await $( 'android=new UiScrollable(new UiSelector().scrollable(true)).setAsHorizontalList().scrollBackward()') ;
    });


    it('Fetching Text', async() => {
        const arr = await $$('android.widget.TextView') ;

        let expectedList = ["API Demos", "Access'ibility", "Accessibility", "Animation", "App", "Content", "Graphics", "Media", "NFC", "OS", "Preference", "Text", "Views" ] ;
        let actualList = [] ;

        for( const elem of arr){
         actualList.push( await elem.getText()) ;
         console.log( await elem.getText() ) ;
        }

        await expect(actualList).toEqual(expectedList) ;
    });


    it('Switch B/w App', async() => {
        // await $('~App').click() ;
        // await $('~Alert Dialogs').click() ;
        await driver.startActivity("io.appium.android.apis" , "io.appium.android.apis.app.AlertDialogSamples") ;
        await driver.pause(5000) ;
        // await expect("//*[@text='App/Alert Dialogs']").toExist() ;
    });




// <<<<<<<<<<<<<<<<<<<<<<<<<< ColorNote hybrid app Testing >>>>>>>>>>>>>>>>>>>>




    it.only('ColorNote', async() => {


        await driver.pause(5000) ;

        // create A note
        await $('//*[@text="SKIP"]').click() ;
        await $('//*[@resource-id="com.socialnmobile.dictapps.notepad.color.note:id/main_btn1"]').click() ;
        await $('//*[@resource-id="com.socialnmobile.dictapps.notepad.color.note:id/text"]').click() ;
        await $('//*[@resource-id="com.socialnmobile.dictapps.notepad.color.note:id/edit_note"]').addValue("Here is the perfection!") ;
        await $('//*[@resource-id="com.socialnmobile.dictapps.notepad.color.note:id/color_btn"]').click() ;
        await $('//*[@resource-id="com.socialnmobile.dictapps.notepad.color.note:id/btn1"]').click() ;
        
        // Going back to main page
        await driver.back() ;
        await driver.back() ;

        // Delete Note
        await $('//*[@text="Here is the perfection!"]').click() ;
        await $('~More').click() ;
        await $('//*[@text="Delete"]').click() ;
        await $('//*[@text="OK"]').click() ;

        // click on hamburger and go to web app
        await $('//*[@resource-id="com.socialnmobile.dictapps.notepad.color.note:id/icon_nav"]').click() ;
        await $('//*[@text="Like us on Facebook"]').click() ;
        
        await driver.pause(5000) ;

        // Web page
        await driver.switchContext("WEBVIEW_chrome") ;
        await driver.pause(5000) ;

        // await $('~About').click() ;
        // await driver.pause(5000) ;

        const url = await driver.getUrl() ;
        console.log(url) ;
        await expect( url ).toEqual("https://m.facebook.com/ColorNote") ;

        await driver.back() ;

        await driver.switchContext("NATIVE_APP") ;


        // const title = await $('(//android.view.View[@content-desc="ColorNote"])[1]').getText() ;
        // const url = await driver.getUrl() ;
        // console.log( title  )
        // console.log( url  )

        
//         await driver.switchContext("WEBVIEW_chrome") ;
// //      now I can automate the Web app

//         await driver.switchContext("NATIVE_APP") ;
        
//         // come back to native App
//         await driver.back() ;

    });



});