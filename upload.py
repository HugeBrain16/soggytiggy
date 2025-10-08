#!/bin/python3

import argparse
from pathlib import Path
from datetime import datetime

from selenium import webdriver
from selenium.webdriver.firefox.options import Options
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as Expect
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By

# -- cli --

parser = argparse.ArgumentParser(prog="uploadtool", description="automated image uploader to database and imgur")
parser.add_argument('filename')
args = parser.parse_args()

image = Path(args.filename)
if not image.exists() and not image.is_file():
    print("Filename invalid!")
    raise SystemExit(1)

# -- selenium --

print("Preparing uploader...")

driver_options = Options()
driver_options.add_argument("--headless")
driver_options.add_argument("--no-sandbox")
driver_options.add_argument("--disable-gpu")
driver_options.add_argument("--disable-dev-shm-usage")
driver_options.add_argument("--disable-extensions")
driver_options.add_argument("--disable-logging")

driver = webdriver.Firefox(options=driver_options)
driver.get("https://uploadimgur.com/")
wait = WebDriverWait(driver, 10)

upload = driver.find_element(By.ID, "images")
upload.send_keys(str(image.resolve()))

upload_button = driver.find_element(By.ID, "upload-button")
upload_button.click()

print("Uploading (can take up to 10 seconds)...")

copylink = wait.until(Expect.visibility_of_element_located((By.CLASS_NAME, "copy-all-btn")))
link = copylink.get_attribute("data-content")

driver.quit()
print("Uploaded successfully!")

# -- uploadtool --

ftime = "%Y-%m-%d %H:%M"
current_datetime = datetime.now().strftime(ftime)

def match_datetime(time: str, fmt: str):
    try:
        dt = datetime.strptime(s, fmt)
        return dt.strftime(fmt) == s
    except ValueError:
        return False

def get_time():
    while input(f"Enter datetime (leave blank to default to '{current_datetime}'): ").strip():
        if match_datetime(time, ftime):
            return datetime.strptime(time, fmt)
        else:
            print("Datetime invalid!")

    print("Defaulting to current datetime...")
    return current_datetime

def get_crop():
    crop = input(f"Enter cropping (e.g., 'center left', leave blank if unsure): ").strip()

    if crop:
        return crop

def get_tags():
    tags = input(f"Enter tags (valid tags are 'gore', 'nsfw', 'doodle'. e.g., 'gore,nsfw'): ").strip()

    if tags:
        return tags

print("Writing record to database...")
with open("gallery.txt", "a") as db:
    record = " | ".join([
        link,
        get_time(),
    ])

    crop = get_crop()
    tags = get_tags()

    if tags:
        if not crop:
            record += " default | " + tags
        else:
            record += f" {crop} | {tags}"

    db.write(record)

print("Done!")

