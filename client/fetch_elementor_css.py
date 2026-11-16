import urllib.request
import re

css_urls = [
    'https://kfkit.rometheme.pro/videen/wp-content/uploads/sites/20/elementor/css/post-1053.css?ver=1668373348',
    'https://kfkit.rometheme.pro/videen/wp-content/uploads/sites/20/elementor/css/post-1066.css?ver=1668373348',
    'https://kfkit.rometheme.pro/videen/wp-content/uploads/sites/20/elementor/css/post-4.css?ver=1668373348',
    'https://kfkit.rometheme.pro/videen/wp-content/uploads/sites/20/elementor/css/post-5.css?ver=1670922088'
]

ids = ['77641fa', 'c59b849', 'd26e645', '9cda6d0', 'fc3fade', '7b7326c', 'e7a9bca', 'bd43591', '58a7240', '7d284ea', '66028b4', '436ca04', '26e06cc']

for url in css_urls:
    req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
    try:
        with urllib.request.urlopen(req, timeout=10) as resp:
            css = resp.read().decode('utf-8')
            for element_id in ids:
                matches = re.findall(r'(\.elementor-element-' + element_id + r'[^{]*\{[^}]+\})', css)
                for m in matches:
                    print(m)
    except Exception as e:
        pass
