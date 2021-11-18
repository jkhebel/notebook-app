use lipsum::{lipsum, lipsum_title};
use std::fs::{create_dir_all, remove_dir_all, File};
use std::io::{Error, Write};

fn main() -> Result<(), Error> {
  let dir = "../notes";
  let n_files = 10;
  let n_pars = 3;
  let n_words_per_par = 50;

  let _ = remove_dir_all(&dir);
  create_dir_all(&dir).expect("Unable to create directory.");

  for n in 0..n_files {
    let title = lipsum_title();
    let path = [&dir, "/", &n.to_string(), " - ", &title, ".txt"].concat();

    let mut text = "#".to_owned();
    text.push_str(&title);

    for _ in 0..n_pars {
      text.push_str("\n\n");
      text.push_str(&lipsum(n_words_per_par));
    }

    let mut f = File::create(path).expect("Unable to open file");
    f.write_all(text.as_bytes()).expect("Unable to write data");
  }

  Ok(())
}
