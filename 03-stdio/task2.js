const { stdin, stdout } = process;

stdout.write('What is your name?\n');
stdin.on('data', (data) => {
  const name = data.toString();
  const reverseName = name.split('').reverse().join('');
  stdout.write(`\nYour name in reverse is ${reverseName}`);
  process.exit();
});
