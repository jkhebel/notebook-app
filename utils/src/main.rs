use std::io::Error;
use structopt::StructOpt;

pub mod sample_data;

#[derive(StructOpt, Debug)]
#[structopt(name = "utils", about = "utilty tools")]
enum Opt {
  #[structopt(name = "create")]
  Create {
    #[structopt(default_value = "../notes", long)]
    directory: String,
    #[structopt(default_value = "10", long)]
    n_notes: usize,
    #[structopt(default_value = "3", long)]
    n_pars: usize,
    #[structopt(default_value = "50", long)]
    n_words_per_par: usize,
  },
  #[structopt(name = "remove")]
  Remove {
    #[structopt(default_value = "../notes", long)]
    directory: String,
  },
}

fn main() -> Result<(), Error> {
  match Opt::from_args() {
    Opt::Create {
      directory,
      n_notes,
      n_pars,
      n_words_per_par,
    } => {
      sample_data::create(directory, n_notes, n_pars, n_words_per_par)
        .expect("Unable to create sample data");
    }
    Opt::Remove { directory } => {
      sample_data::remove(directory).expect("Unable to remove sample data")
    }
  }
  Ok(())
}
