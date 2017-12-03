const fs = require('fs');
const _ = require('lodash');
const yargs = require('yargs');

const notes = require('./notes.js');

const titleOption = {
	describe: 'Title of a note',
	demand: true,
	alias: 't'
}
const bodyOption = {
	describe: 'Body of a note',
	demand: true,
	alias: 'b'
}

const argv = yargs
	.command('add', 'Add a new note', {
		title: titleOption,
		body: bodyOption
	})
	.command('list', 'List all notes')
	.command('read', 'Read a note', {
		title: titleOption	
	})
	.command('remove', 'Remove a note', {
		title: titleOption
	})
	.help()
	.argv;

var command = argv._[0];
//console.log(argv);


if(command === 'add'){
	let note = notes.addNote(argv.title, argv.body);
	if(note){
		console.log('A new note is created');
		notes.logNote(note);
	}
	else
		console.log('Note title already exist ...');

}
else if(command === 'list'){
	var allNotes = notes.getAll();
	console.log(`Printing ${allNotes.length} note(s).`);
	allNotes.forEach(note => notes.logNote(note));
}
else if(command === 'read'){
	var fetchedNote = notes.getNote(argv.title);
	if(fetchedNote){
		console.log('Note is found');
		notes.logNote(fetchedNote);
	}
	else{
		console.log('Note not found');
	}
}
else if(command === 'remove'){
	var noteRemoved = notes.removeNote(argv.title);
	var message = noteRemoved? 'Note is removed':'Note not found';
	console.log(message);
}
else{
	console.log('command not resognized');
}
