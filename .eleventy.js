// START 11TY imports
import eleventyNavigationPlugin             from "@11ty/eleventy-navigation";
import { InputPathToUrlTransformPlugin }    from "@11ty/eleventy";
import { eleventyImageTransformPlugin }     from "@11ty/eleventy-img";
import { EleventyHtmlBasePlugin }           from "@11ty/eleventy";
import pluginRss                            from "@11ty/eleventy-plugin-rss";
// END 11TY imports

// START LibDoc imports
import libdocConfig                         from "./_data/libdocConfig.js";
import libdocFunctions                      from "./_data/libdocFunctions.js";
// END LibDoc imports


// Copilot generated code part 1
// .eleventy.js (ESM)
import markdownIt from "markdown-it";
import mathjax3 from "markdown-it-mathjax3";
// End of Copilot generated code part 1



export default function(eleventyConfig) {
    // START PLUGINS
    eleventyConfig.addPlugin(EleventyHtmlBasePlugin);
    eleventyConfig.addPlugin(InputPathToUrlTransformPlugin);
    eleventyConfig.addPlugin(eleventyNavigationPlugin);
    eleventyConfig.addPlugin(eleventyImageTransformPlugin, libdocFunctions.pluginsParameters.eleventyImageTransform());
    eleventyConfig.addPlugin(pluginRss);
    // END PLUGINS

    // START FILTERS
    eleventyConfig.addAsyncFilter("autoids", libdocFunctions.filters.autoids);
    eleventyConfig.addAsyncFilter("embed", libdocFunctions.filters.embed);
    eleventyConfig.addAsyncFilter("cleanup", libdocFunctions.filters.cleanup);
    eleventyConfig.addAsyncFilter("dateString", libdocFunctions.filters.dateString);
    eleventyConfig.addAsyncFilter("datePrefixText", libdocFunctions.filters.datePrefixText);
    eleventyConfig.addAsyncFilter("toc", libdocFunctions.filters.toc);
    eleventyConfig.addAsyncFilter("sanitizeJSON", libdocFunctions.filters.sanitizeJson);
    eleventyConfig.addAsyncFilter("gitLastModifiedDate", libdocFunctions.filters.gitLastModifiedDate);
    // END FILTERS

    // START COLLECTIONS
    eleventyConfig.addCollection("myTags", libdocFunctions.collections.myTags);
    eleventyConfig.addCollection("postsByDateDescending", libdocFunctions.collections.postsByDateDescending);
    // END COLLECTIONS

    // START SHORTCODES
    eleventyConfig.addShortcode("alert", libdocFunctions.shortcodes.alert);
    eleventyConfig.addPairedShortcode("alertAlt", libdocFunctions.shortcodes.alert);
    eleventyConfig.addShortcode("embed", libdocFunctions.shortcodes.embed);
    eleventyConfig.addShortcode("icomoon", libdocFunctions.shortcodes.icomoon);
    eleventyConfig.addShortcode("icon", libdocFunctions.shortcodes.icon);
    eleventyConfig.addShortcode("iconCard", libdocFunctions.shortcodes.iconCard);
    eleventyConfig.addPairedShortcode("sandbox", libdocFunctions.shortcodes.sandbox);
    eleventyConfig.addPairedShortcode("sandboxFile", libdocFunctions.shortcodes.sandboxFile);
    // END SHORTCODES

    // START FILE COPY
	eleventyConfig.addPassthroughCopy("sandboxes");
    eleventyConfig.addPassthroughCopy("assets");
    eleventyConfig.addPassthroughCopy("core/assets");
    eleventyConfig.addPassthroughCopy("favicon.png");
    // END FILE COPY
    
    // Copilot generated code part 2
    let md = markdownIt({
        html: true,
        breaks: true,
        linkify: true
        }).use(mathjax3, {
            tex: {
            inlineMath: [['$','$']],     // Inline math with $...$
            displayMath: [['$$','$$']] // Block math with $$...$$
            }
        });

    eleventyConfig.setLibrary("md", md);
    // End of Copilot generated code part 2


    return {
        pathPrefix: libdocConfig.htmlBasePathPrefix
    }
};