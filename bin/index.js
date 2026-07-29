#! /usr/bin/env node

const { program, Option } = require('commander');

const { apiUtility } = require('./utils');

program
    .name('TMDB CLI Interface')
    .description('A CLI tool to fetch movie details from tmdb servers')
    .addOption(new Option('-t, --type <category>', 'Type of movie list to fetch').choices(['playing', 'popular', 'top', 'upcoming']).makeOptionMandatory())
    .option(
        '-l, --language <lang>',
        'ISO 639-1 language code',
        'en-US' // Default value if flag is omitted
    )
    .option(
        '-p, --page <number>',
        'Page number to fetch',
        (val) => parseInt(val, 10), // Converts string input "2" to number 2
        1 // Default page is 1
    )
    .action(async (option) => {
        //console.table(apiUtility(option.type));
        let res = await apiUtility(option);
        console.table(res);
    })

program.parse(process.argv);