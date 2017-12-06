viron-parameters-parameter.Parameters_Parameter(class="{ 'Parameters_Parameter--' + spreadStyle  }")
  virtual(if="{ isFormMode }")
    viron-parameters-form(formObject="{ formObject }" identifier="{ parameterObject.name }" val="{ opts.val }" theme="{ opts.theme }" isDisabled="{ isFormDisabled }" onChange="{ handleValChange }")
  virtual(if="{ isPropertiesMode }")
    viron-parameters-properties(label="{ propertiesLabel }" identifier="{ parameterObject.name }" val="{ opts.val }" theme="{ opts.theme }" required="{ parameterObject.required }" propertiesObject="{ propertiesObject }" onChange="{ handleValChange }")
  virtual(if="{ isItemsMode }")
    viron-parameters-items(label="{ itemsLabel }" identifier="{ parameterObject.name }" val="{ opts.val }" theme="{ opts.theme }" required="{ parameterObject.required }" schemaObject="{ schemaObject }" onChange="{ handleValChange }")

  script.
    import '../form/index.tag';
    import '../items/index.tag';
    import '../properties/index.tag';
    import script from './index';
    this.external(script);
