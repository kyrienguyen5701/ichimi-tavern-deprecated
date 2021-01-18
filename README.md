# ![Houshou flag](./src/assets/houshou_flag.png) Welcome to Houshou no Ichimi Tavern ![Houshou flag](./src/assets/houshou_flag.png)

Ahoy～ A tavern for Ichimi to hang out (really?) while hearing the sounds from our beloved Senchou and admiring her charm in the background gallery.

ヨーソロー～

[Homepage](https://kyrienguyen5701.github.io/ichimi-tavern/#)

Related links:
* [Houshou Marine's Youtube channel](https://www.youtube.com/channel/UCCzUftO8KOVkV4wQG1vkUvg)
* [Houshou Marine's Twitter](https://twitter.com/houshoumarine)

Other buttons: 
* [Aqua Button](https://aquaminato.moe/)
* [Fubuki Button](https://sfubuki.moe/)
* [Pekora Button](https://ntnam11.github.io/pekora-button/)

## Contributing

Please fork this project and initiate a Pull Request in this project after finishing your modification.

### Add / Modify Marine Button

A Marine Button need two files:
* A MP3 file put in `/src/assets/voices`
* A JSON file put in `/src/assets/meta`, with the following definitions:
    ```json
    {
        "file": "MP3 file name",
        "category": "Category number",
        "name": {
            "en": "English button name",
            "ja": "Japanese button name"
        },
        "url": "Youtube-source-URL"
    }
    ```
For category numbers, check out `src/assets/categories.json`. You can also create a new one (if it's used widely enough)

For `name`, new languages can be added (i.e: `vn`). Check the `src/lang` folder for consistency. English will be used as default for unknown translation names.

### Site translation

The site's language is defined in `src/assets/langs` folder.

Any translation/contribution is welcome.

## Deploying a local development environment

This site was initiated using create-react-app.

To deploy a local development environment, first install the LTS version of Node. Then follow these steps:
1. Clone the repository using git through this command `git clone https://github.com/kyrienguyen5701/ichimi-tavern.git` or through Github Desktop App. You can also download as a .zip file.
2. Go into the repository `cd ichimi-tavern`
3. Run `npm install` or `yarn`
4. Run `npm start` or `yarn start`. During the code modification process, the local development server can immediately reflect the results of the modification.
5. To compile the files for deployment, run `npm build` or `yarn build`, which will generate the `build` directory. This site is completely static, you can directly deploy the entire `build` directory.

## What's next
* More Marine buttons
* A Japanese translation for the Disclaimer page
* A playlist function so people can create their own playlist of sounds
* A gallery function that allows people to custom their gallery (add/remove background pictures, etc.)
* An animated Houshou flag and more interesting loading screens
* A chatbot that can imitate Senchou (ethical?)
* A mobile app version (necessary tho?)
...

## LICENSE

Audio: According to the [Hololive secondary creation license](https://www.hololive.tv/terms).

This project is a work of enthusiasts and is not related to the hololive official.

## Special Thanks

This project is inspired by [Pekora Button](https://github.com/ntnam11/pekora-button) - [Homepage](https://ntnam11.github.io/pekora-button/)

Thank you other overseas sexy guys for clipping and translating videos - your works help bring Marine closer to many people and contribute a crucial part to recruiting more members for the Houshou crew. Thank you artists who drew nice Marine's arts.

## Afterwords

I felt relieved that I finished the first version of this project when Marine reached 1M subscribers. Hope I can grow this website bigger in the future.

マリン船長、１００万人おめでとう！！！
