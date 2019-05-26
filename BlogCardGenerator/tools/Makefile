# プロジェクトフォルダへの相対パス。
PROJECT_HOME=..
# closure-compilerへの絶対パス。
COMPILER=~/bin/compiler-latest/closure-compiler-v20190513.jar
# closure-stylesheetsへの絶対パス。
STYLSHEETS=~/bin/compiler-latest/closure-stylesheets.jar
# closure-compilerのオプション。
COMPILERFLAGS=--language_out ECMASCRIPT_2015 --isolation_mode IIFE --compilation_level ADVANCED
# 出力ファイル名にはEclipseプロジェクト名を小文字化したものを使う。
MODULE_NAME=$(shell echo $(PROJECT_NAME) | tr A-Z a-z)
# JS出力フォルダ。
OUT_MINIFIED=$(PROJECT_HOME)/minified
# closure-stylesheetsのオプション。
STYLSHEETSFLAGS=

DELRECURSIVE=rm -rf
MKDIR=mkdir -p
JAVA_JAR=java -jar
SCRIPT=$(PROJECT_HOME)/script
CSS=$(PROJECT_HOME)/css
JS_SRCS:=$(wildcard $(SCRIPT)/*.js)
CSS_SRCS:=$(wildcard $(CSS)/*.css)
GSS_SRCS:=$(wildcard $(CSS)/*.gss)

# Targets
.PHONY: ALL
ALL : $(MODULE_NAME)

$(OUT_MINIFIED)/$(MODULE_NAME).min.js : $(JS_SRCS)
	-$(MKDIR) $(@D)
	$(JAVA_JAR) $(COMPILER) $(COMPILERFLAGS) --js $^ --create_source_map $(@D)/$(MODULE_NAME).map --js_output_file $(@D)/$(MODULE_NAME).min.js

$(OUT_MINIFIED)/$(MODULE_NAME).css : $(CSS_SRCS) $(GSS_SRCS)
	-$(MKDIR) $(@D)
	$(JAVA_JAR) $(STYLSHEETS) $(STYLSHEETSFLAGS) $^ --output-file $(@D)/$(MODULE_NAME).css

$(MODULE_NAME) : $(OUT_MINIFIED)/$(MODULE_NAME).min.js $(OUT_MINIFIED)/$(MODULE_NAME).css

.PHONY: clean
clean :
	-$(DELRECURSIVE) $(OUT_MINIFIED)/*.min.js
	-$(DELRECURSIVE) $(OUT_MINIFIED)/*.map
	-$(DELRECURSIVE) $(OUT_MINIFIED)/*.css
