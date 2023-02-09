trait IPushCallback {
    fn push_callback(&self, button: &str);
}

trait Push {
    fn push(&self);
}

struct Button {
    name: String,
    i_push_callback: Box<dyn IPushCallback>,
}

impl Push for Button {
    fn push(&self) {
        self.i_push_callback.push_callback(&self.name);
    }
}

struct PlayButtonCallback {}

impl IPushCallback for PlayButtonCallback {
    fn push_callback(&self, button: &str) {
        println!("{} button pushed", button);
    }
}

fn main() {
    println!("Hello, world!");

    let play_button = Button {
        name: "play".to_string(),
        i_push_callback: Box::new(PlayButtonCallback {}),
    };

    play_button.push();
}
