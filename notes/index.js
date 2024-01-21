const { readFile, writeFile, access, constants } = require('node:fs/promises');
const { join } = require('node:path');

// The create method creates a new note in the notes.json file. The create method has two arguments: the note's title and its content.
// The list method displays a list of notes.
// The view method outputs the content of a note whose title is passed as an argument.
// The remove method deletes a note whose title is passed as an argument.

const [command, title, content] = process.argv.slice(2);

switch (command) {
  case 'create':
    create(title, content);
    break;
  case 'list':
    list();
    break;
  case 'view':
    view(title);
    break;
  case 'remove':
    remove(title);
    break;
  default:
    console.log('Unknown command');
}

async function init() {
  try {
    console.log('Create notes');
    await writeFile(join(__dirname, 'notes.json'), '[]');
  } catch (err) {
    console.error(err.message);
  }
}

async function create(title, content) {
  try {
    console.log('check if notes exists');
    await access(join(__dirname, 'notes.json'), constants.F_OK);
  } catch {
    await init();
  }

  console.log('read notes');
  const data = await readFile(join(__dirname, 'notes.json'));
  const notes = JSON.parse(data);
  console.log('add new note to notes');
  notes.push({ title, content });

  console.log('write updated notes.');
  await writeFile(join(__dirname, 'notes.json'), JSON.stringify(notes));
}

async function list() {
  const data = await readFile(join(__dirname, 'notes.json'));
  const notes = JSON.parse(data);

  for (const note of notes) {
    console.log(`${note.title}: ${note.content}`);
  }
}
