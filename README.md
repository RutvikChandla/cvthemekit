# CVThemeKit

CVThemeKit is a cli tool to customise your theme with CloudVyapaar

## Table of Contents
- [Installation](#installation)
- [Usage](#usage)
- [Themes](#themes)
- [Contribute](#contribute)
- [License](#license)

## Installation

To use CVThemeKit, follow these simple steps:

1. Clone the repository:
   ```bash
   git clone https://github.com/RutvikChandla/cvthemekit.git
   ```

2. Change into the directory:
   ```bash
   cd cvthemekit
   ```

3. Install CVThemeKit globally using npm:
   ```bash
   sudo npm install -g .
   ```

Now you have CVThemeKit installed and ready to use on your system.

## Usage

### Configure

```bash
cvtheme configure --store "random.cv.com" --themeID 1000459 -p random@321
```
Creates a `config.yaml` file with the following options:

- `--version`: Show version number [boolean]
- `--help`: Show help [boolean]
- `-t, --themeID`: Theme ID associated with the store [string] [required]
- `-s, --store`: Store URL. Example: `random.mycvshop.com` [string] [required]
- `-p, --password`: Your CV Shop API password [string] [required]

### Get Themes

```bash
cvtheme get --list
```

Get themes

- `--version`: Show version number `[boolean]`
- `--help`: Show help `[boolean]`
- `-t, --themeID`: Theme ID associated with the store `[string]`
- `-s, --store`: Store URL. Example: `random.mycvshop.com` `[string]`
- `-p, --password`: Your CV Shop API password `[string]`
- `--list`: List all theme IDs `[boolean]`

### Watch Themes

```bash
cvtheme watch
```


Enjoy using CVThemeKit! 🚀

## Contribute

If you'd like to contribute to CVThemeKit, feel free to submit pull requests, open issues, or suggest improvements. Your feedback and contributions are highly appreciated.

## License

CVThemeKit is licensed under the [MIT License](LICENSE). Feel free to use, modify, and distribute it according to the terms of the license.

Happy theming your CV! 🌟