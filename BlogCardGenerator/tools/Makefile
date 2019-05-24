PROJECT_HOME=..
DELRECURSIVE=rm -rf
MKDIR=mkdir -p
OUT_MINIFIED=$(PROJECT_HOME)/minified
JAVA_JAR=java -jar
COMPILER=~/bin/compiler-latest/closure-compiler-v20190513.jar
SCRIPT=$(PROJECT_HOME)/script
JS_SRCS:=$(wildcard $(SCRIPT)/*.js)
MODULE_NAME=$(shell echo $(PROJECT_NAME) | tr A-Z a-z)

# Targets
.PHONY: ALL
ALL : $(MODULE_NAME)

$(OUT_MINIFIED)/$(MODULE_NAME).min.js : $(JS_SRCS)
	-$(MKDIR) $(@D)
	$(JAVA_JAR) $(COMPILER) --js $< --create_source_map $(@D)/$(MODULE_NAME).map --js_output_file $(@D)/$(MODULE_NAME).min.js

$(MODULE_NAME) : $(OUT_MINIFIED)/$(MODULE_NAME).min.js

.PHONY: clean
clean :
	-$(DELRECURSIVE) $(OUT_MINIFIED)
